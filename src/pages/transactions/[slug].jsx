import NaviBar from "src/components/NaviBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Modal, message, Table } from "antd";
import { useRouter } from "next/router";
import AccountApi from "../../services/account";
import Head from "next/head";
import InvoiceApi from "../../services/invoice";
import Barcode from "react-barcode";

const StaffDetail = () => {
  const router = useRouter();
  const [id, setId] = useState();
  
  const [loading, setLoading] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({});

  const [user, setUser] = useState();
    
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, [])

  useEffect(() => {
    InvoiceApi.listById({id: router.query.slug})
    .then((res) => {
      if (res) {
        setData(res.data);
        setProducts(
          res.data.detail_products.map((item) => {
            return {...item.product, quantity: item.quantity}
          })
        );
        setId(router.query.slug);
      }
    }).catch(err => console.log(err))
   
  }, [])

  const handleDelete = async () => {
    const res = await AccountApi.deleteAccount({
      id: id
    }).catch(err => {
      const data = err.response.data;
      if (!!data.message.msg) message.error(data.message.msg);
      else message.error(data.message)
    });

    if (res) {
      message.success("Account delete successed!");
      setTimeout(() => router.reload(), 2000);
      return true;
    }
    return false; 
  }

  console.log(data);
  const columns = [
    {
      title: 'Barcode',
      dataIndex: '_id',
      key: '_id',
      align: "center",
      render: (item) => (
        <Barcode width={1} height={40} fontSize={12} value={item} />
      )
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Retail Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      align: "center",
      render: (item) => (
        <span>{item.toLocaleString()} VNĐ</span>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: "center",
      key: 'category',
    },
    {
      title: 'Imported Date',
      dataIndex: 'created_at',
      align: "center",
      key: 'created_at',
      width: 150,
      render: (item) => (
        <span>{(new Date(item)).toLocaleDateString("vi-VN")}</span>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 100
    }
  ];

  return (
    <>
      <Head>
        <title>Transaction Details</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)}/>
        <div className={`p-[32px]`} style={{width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ")"}}>
          <div className="flex justify-between items-center mb-[24px]">
            <h1 className="font-bold text-2xl ">Transaction Details</h1>
            {
              (user && user.role == "Admin") && (
                <Button onClick={() => setDeleteModal(true)} type="primary" danger className="w-fit" size="large">
                  <span>Delete Transaction</span>
                </Button>
              )
            }
           
          </div>
          <div className="flex gap-[32px] ">
            <div className="bg-white p-[24px] rounded-[12px] w-2/3">
              <Table 
                loading={loading} 
                scroll={{ x: "max-content", y: 500 }} 
                dataSource={products} 
                columns={columns}
              /> 
            </div>
            <div className="w-1/3">
              <div className="bg-white p-[24px] rounded-[12px] mb-[24px]">
                <div className="flex justify-between">
                  <h4>Total Amount:</h4>
                  <p>{(data.total_amount || "").toLocaleString()} VNĐ</p>
                </div>
                <div className="flex justify-between">
                  <h4>Customer Given:</h4>
                  <p>{(data.customer_given || "").toLocaleString()} VNĐ</p>
                </div>
                <div className="flex justify-between">
                  <h4>Customer Paidback:</h4>
                  <p>{(data.paid_back || "").toLocaleString()} VNĐ</p>
                </div>
                <div className="flex justify-between">
                  <h4>Date Issued:</h4>
                  <p>{(new Date(data.created_at)).toLocaleDateString("vi-VN")}</p>
                </div>

              </div>
              <div className="bg-white p-[24px] rounded-[12px]">
                <div className="flex justify-between">
                  <h4>Staff Issued:</h4>
                  <p>{data?.account?.fullName}</p>
                </div>
                <div>
                  <div className="flex justify-between">
                    <h4>Customer:</h4>
                    <p>{data?.customer?.name}</p>
                  </div>
                  <span
                    className="cursor-pointer text-[12px] leading-3 block ml-auto w-fit hover:underline hover:text-[#4096ff]" 
                    onClick={() => router.push("/customers/" + data?.customer?._id)}
                  >
                    View customer's info
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title={"Delete staff"}
          open={deleteModal}
          onOk={handleDelete}
          onCancel={() => {setDeleteModal(false)}}
          loading={true}
          centered
        >
          <p>Are you sure you want to delete this transaction?</p>
        </Modal>
      </main>
    </>
  )
}

export default StaffDetail;
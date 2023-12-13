import Image from "next/image";
import Head from "next/head";
import { Input, Button, Table, Modal, message } from "antd";
import { useEffect, useState } from "react";
import NaviBar from "src/components/NaviBar";
import { useRouter } from "next/router";
import CustomerApi from "src/services/customer"
import InvoiceApi from "../../services/invoice";

const CustomerDetails = () => {
  const [editModal, setEditModal] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);  
  const [customerData, setCustomerData] = useState({});

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [toggleMenu, setToggleMenu] = useState(true);
  const [invoiceList, setInvoiceList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const router = useRouter();
  
  const invoiceColumns = [
    {
      title: 'Issued on',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => (
        <span>
          {(new Date(item)).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })}
        </span>
      )
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Customer Given',
      dataIndex: 'customer_given',
      key: 'customer_given',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Customer Paidback',
      dataIndex: 'paid_back',
      key: 'paid_back',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Staff Issued',
      dataIndex: 'account',
      key: 'account',
      render: (item) => (
        <span>
          {item.fullName}
        </span>
      )
    },
    {
      title: '',
      align: "right",
      render: (_, item) => {
        return (
          <div className="flex justify-end gap-[12px]">
            <Image 
              className="cursor-pointer" 
              onClick={() => {
                router.push("/transactions/" + item._id)
              }} 
              alt="" 
              src={"/svg/redirect.svg"} 
              width={24} 
              height={24}
            />
          </div>
        )
      }
    }
  ];

  const [user, setUser] = useState();
    
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, [])

  useEffect(() => {
    CustomerApi.listById({id: router.query.slug})
    .then((res) => {
      if (res) {
        setCustomerData(res.data);
        setPhoneNumber(res.data.phone_number);
        setFullName(res.data.name);
        setAddress(res.data.address);
      }
    })
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
  }, [])

  useEffect(() => {
    setLoading(true);
    InvoiceApi.listInvoiceByCustomer({
      id: router.query.slug,
      page: page,
      limit: 8
    }).then((res) => {
      if (res) {
        setInvoiceList(res.data);
        setTotalPage(res.total_page)
      }
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }, [page]); 

  const handleDelete = async () => {
    const res = await CustomerApi
    .deleteCustomer({
      id: router.query.slug
    })
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Customer deleted success!");
      setTimeout(() => router.push("/customers"), 2000);
    } else {
      message.error("Customer deleted failed!");
    }
  }

  const handleEdit = async () => {
    const res = await CustomerApi
    .editCustomer({
      id: router.query.slug,
      phone_number: phoneNumber,
      address: address,
      name: fullName
    })
    .catch((err) => {
      const data = err.response.data;
      if (!!data.message.msg) message.error(data.message.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Customer updated success!");
      setTimeout(() => router.reload(), 2000);
    } else {
      message.error("Customer updated failed!");
    }
  }

  return (
    <>
      <Head>
        <title>Customers Details</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} />
        <div className={`p-[32px]`} style={{width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ")"}}>
          <h1 className="font-bold text-2xl mb-[24px]">Customers Management</h1>
            <div className="flex gap-[32px]">
              <div className="w-3/4 bg-white p-[24px] rounded-[12px] flex justify-between">
                <div className="w-1/2">
                  <h3>Phone number:</h3>
                  <p>{customerData.phone_number}</p>
                  <h3>Name:</h3>
                  <p>{customerData.name}</p>
                </div>
                <div className="w-1/2">
                  <h3>Address:</h3>
                  <p>{customerData.address}</p>
                </div>
              </div>
              <div className="w-1/4 bg-white p-[24px] rounded-[12px]">
                <h2 className="text-right">Actions</h2>
                <div className="flex flex-col items-end">
                  <Button onClick={() => setEditModal(true)} type="primary" className="w-fit mb-[12px]">
                    <span>Edit Customer</span>
                  </Button >
                  {(user && user.role == "Admin") && (
                    <Button onClick={() => setDeleteModal(true)}  type="primary" danger className="w-fit">
                      <span>Delete Customer</span>
                    </Button>
                  )}
                  
                </div>
              </div>
            </div>
            <div
              className="mt-[32px]"
            >
              <h3>Issued Orders</h3>
              <Table
                loading={loading}
                className="mt-[16px]"
                scroll={{ x: "max-content" }} 
                dataSource={invoiceList} 
                columns={invoiceColumns} 
                pagination={{
                  total: 8 * totalPage,
                  pageSize: 8,
                  onChange: (page) => setPage(page)
                }}
              />
            </div>

        </div>

        <Modal
          title={"Edit Customer"}
          open={editModal}
          onOk={handleEdit}
          onCancel={() => {setEditModal(false)}}
          centered

        >
          <p className="text-[16px] mt-[16px]">Phone Number</p>
          <Input 
            disabled
            size="large"
            className="mb-[12px]"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} 
            placeholder="Enter phone number"
          />
          <p className="text-[16px] mt-[16px]">Fullname</p>
          <Input 
            size="large"
            className="mb-[12px]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} 
            placeholder="Enter fullname"
          />
          <p className="text-[16px]">Address</p>
          <Input 
            size="large"
            value={address}
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter address"
          />
        </Modal>

        <Modal
          title={"Delete Customer"}
          open={deleteModal}
          onOk={handleDelete}
          onCancel={() => {setDeleteModal(false)}}
          centered
        >
          <p>Are you sure you want to delete this customer?</p>
        </Modal>
      </main>
    </>
  );
};

export default CustomerDetails;

import Image from "next/image";
import Head from "next/head";
import { Input, Button, Table, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@uidotdev/usehooks";
import NaviBar from "src/components/NaviBar";
import { useRouter } from "next/router";
import CustomerApi from "../../services/customer";

const Customers = () => {
  const [addModal, setAddModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);

  const [editCustomer, setEditCustomer] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);  

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [toggleMenu, setToggleMenu] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const debounceValue = useDebounce(searchValue, 2000);

  const [data, setData]= useState([]);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    setLoading(true);
    if (debounceValue == "") {
      CustomerApi.list({page: page, limit: 8}).then((res) => {
        let newData = res.data.map((item) => {
          return {
            ...item,
            key: item._id
          }
        })
        setData(newData);
        setTotalPage(res.total_page);
        setLoading(false);
      })
    } else 
    {
      CustomerApi.search({page: page, limit: 8, name: debounceValue}).then((res) => {
        let newData = res.data.map((item) => {
          return {
            ...item,
            key: item._id
          }
        })
        setData(newData);
        setTotalPage(res.total_page);
        setLoading(false);
      })
    }
  }, [page, debounceValue])

  useEffect(() => {
    setPage(1);
  }, [debounceValue])

  const router = useRouter();

  const columns = [
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      align: "right",
      render: (_, item) => {
        return (
          <div className="flex justify-end gap-[12px]">
            <Image 
              className="cursor-pointer" 
              onClick={() => router.push("/customers/"+item._id)} 
              alt="" 
              src={"/svg/redirect.svg"} 
              width={24} 
              height={24}
            />
            <Image 
              className="cursor-pointer"
              onClick={() => {
                setEditCustomer(item);
                setEditModal(true);
              }}
              alt="" 
              src={"/svg/edit.svg"} 
              width={24} 
              height={24}
            />
            <Image 
              className="cursor-pointer"
              onClick={() => {
                setDeleteId(item._id);
                setDeleteModal(true);
              }}
              alt="" 
              src={"/svg/trash.svg"} 
              width={24} 
              height={24}
            />
          </div>
        )
      }
    }
  ];

  const handleAdd = async () => {
    const res = await CustomerApi
    .add({
      phone_number: phoneNumber,
      address: address,
      name: fullName
    })
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Customer added success!");
      setTimeout(() => router.reload(), 2000);
    } else {
      message.error("Customer added failed!");
    }
  }

  const handleDelete = async () => {
    const res = await CustomerApi
    .deleteCustomer({
      id: deleteId
    })
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Customer deleted success!");
      setTimeout(() => router.reload(), 2000);
    } else {
      message.error("Customer deleted failed!");
    }
  }

  const handleEdit = async () => {
    const res = await CustomerApi
    .editCustomer({...editCustomer, id: editCustomer._id})
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
        <title>Customers Management</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
        <div className={`p-[32px]`} style={{width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ")"}}>
          <h1 className="font-bold text-2xl mb-[24px]">Customers Management</h1>
          <div className="flex justify-between gap-[12px] mb-[24px]">
            <Input 
              prefix={<SearchOutlined size={12}/>}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)} 
              placeholder="Find Customers via Phone Number / Fullname"
            />
            <Button
              icon={<PlusOutlined size={12}/>}
              onClick={() => setAddModal(true)}
              type="primary" 
              size="large" 
              className="w-fit font-semibold"
            >
              Add new
            </Button>
          </div>
          <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 8,
              total: totalPage * 8,
              onChange: (page) => setPage(page)
            }}
          />
        </div>

        <Modal
          title={"Add Customer"}
          open={addModal}
          onOk={handleAdd}
          onCancel={() => {setAddModal(false)}}
          centered

        >
          <p className="text-[16px] mt-[16px]">Phone Number</p>
          <Input 
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
            value={editCustomer.phone_number}
            onChange={(e) => setEditCustomer({...editCustomer, phone_number: e.target.value})} 
            placeholder="Enter phone number"
          />
          <p className="text-[16px] mt-[16px]">Fullname</p>
          <Input 
            size="large"
            className="mb-[12px]"
            value={editCustomer.name}
            onChange={(e) => setEditCustomer({...editCustomer, name: e.target.value})} 
            placeholder="Enter fullname"
          />
          <p className="text-[16px]">Address</p>
          <Input 
            size="large"
            value={editCustomer.address}
            onChange={(e) => setEditCustomer({...editCustomer, address: e.target.value})} 
            placeholder="Enter address"
          />
        </Modal>
      </main>
    </>
  );
};

export default Customers;

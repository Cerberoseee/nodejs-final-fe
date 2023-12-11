import Image from "next/image";
import Head from "next/head";
import { Input, Button, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@uidotdev/usehooks";
import NaviBar from "src/components/NaviBar";
import { useRouter } from "next/router";

const Customers = () => {
  const [addModal, setAddModal] = useState(false); 
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);  

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const debounceValue = useDebounce(searchValue, 4000);
  const [toggleMenu, setToggleMenu] = useState(true);

  useEffect(() => {console.log(debounceValue);}, [debounceValue])

  const router = useRouter();

  const data = [
    {
      key: '1',
      phone_number: "0123123123",
      name: "Nguyen Van Test"
    },
    {
      key: '2',
      phone_number: "0123123123",
      name: "Nguyen Van Test"
    },
    {
      key: '3',
      phone_number: "0123123123",
      name: "Nguyen Van Test"
    }
  ]

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
              onClick={() => router.push("/customers/"+item.id)} 
              alt="" 
              src={"/svg/redirect.svg"} 
              width={24} 
              height={24}
            />
            <Image 
              className="cursor-pointer"
              onClick={() => setDeleteModal(true)} 
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
              placeholder="Find Customers via ID / Name"
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
            dataSource={data}
            columns={columns}
            scroll={{ x: "max-content" }}
          />
        </div>

        <Modal
          title={"Add Customer"}
          open={addModal}
          onOk={() => {}}
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
          <p className="text-[16px]">Email</p>
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
          onOk={() => {}}
          onCancel={() => {setDeleteModal(false)}}
          centered
        >
          <p>Are you sure you want to delete this customer?</p>
        </Modal>
      </main>
    </>
  );
};

export default Customers;

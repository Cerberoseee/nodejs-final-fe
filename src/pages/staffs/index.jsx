import Image from "next/image";
import { Input, Button, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@uidotdev/usehooks";
import NaviBar from "src/components/NaviBar/NaviBar";

const Staffs = () => {
  const [addModal, setAddModal] = useState(false); 
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const debounceValue = useDebounce(searchValue, 4000);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {console.log(debounceValue);}, [debounceValue])
  const data = [
    {
      key: '1',
      name: "Nguyen Van A",
      avatar: {
        url: "/avatar-placeholder.jpg"
      },
      isVerified: true,
      isActive: true,
      position: "Staff",
      email: "a@gmail.com"
    },
    {
      key: '2',
      name: "A",
      avatar: {
        url: "/avatar-placeholder.jpg"
      },
      isVerified: true,
      isActive: false,
      position: "Super Admin",
      email: "a@gmail.com"
    },
    {
      key: '3',
      name: "A",
      avatar: {
        url: "/avatar-placeholder.jpg"
      },
      isVerified: false,
      isActive: false,
      position: "Super Admin",
      email: "a@gmail.com"
    }
  ]

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (item) => (
        <Image className="rounded-[50%]" width={48} height={48} src={item.url} alt="avatar"/>
      )
    },
    {
      title: 'Fullname',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Verify Status',
      dataIndex: 'isVerified',
      key: 'isVerified',
      align: "center",
      render: (item) => {
        return item ? (<Image alt="" className="m-auto" width={24} height={24} src={"/svg/approved.svg"} />) : (<Image alt="" className="m-auto" width={24} height={24} src={"/svg/deny.svg"} />)
      }
    },
    {
      title: 'Active Status',
      dataIndex: 'isActive',
      key: 'isActive',
      align: "center",
      render: (item) => {
        return item ? (<Image alt="" className="m-auto" width={24} height={24} src={"/svg/approved.svg"} />) : (<Image alt="" className="m-auto" width={24} height={24} src={"/svg/deny.svg"} />)
      }
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Action',
      align: "right",
      render: (_, item) => {
        return (
          <div className="flex justify-end gap-[12px]">
            {!item.isVerified && 
              (
                <Image alt="" src={"/svg/send.svg"} width={24} height={24}/>
              )
            }
            <Image alt="" src={"/svg/lock.svg"} width={24} height={24}/>
            <Image alt="" src={"/svg/edit.svg"} width={24} height={24}/>
            <Image alt="" src={"/svg/trash.svg"} width={24} height={24}/>
          </div>
        )
      }
    }
  ];

  return (
    <main className={`flex min-h-screen bg-[#FAF2E3]`}>
      <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
      <div className={`p-[32px]`} style={{width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ")"}}>
        <h1 className="font-bold text-2xl mb-[24px]">Staffs Management</h1>
        <div className="flex justify-between gap-[12px] mb-[24px]">
          <Input 
            prefix={<SearchOutlined size={12}/>}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} 
            placeholder="Find Staffs via ID / Name"
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
        title={"Add employee"}
        open={addModal}
        onOk={() => {}}
        onCancel={() => {setAddModal(false)}}
        loading={true}
        centered

      >
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
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter email address"
        />
      </Modal>
    </main>
  );
};

export default Staffs;

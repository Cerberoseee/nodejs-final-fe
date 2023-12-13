import Image from "next/image";
import Head from "next/head";
import { Input, Button, Table, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@uidotdev/usehooks";
import NaviBar from "src/components/NaviBar";
import { useRouter } from "next/router";
import AccountApi from "src/services/account"
import {getStorageUrl} from "src/misc"

const Staffs = () => {
  const [addModal, setAddModal] = useState(false); 
  const [verifyModal, setVerifyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [lockUnlockModal, setLockUnlockModal] = useState(false);
  
  const [verifyEmail, setVerifyEmail] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [lockId, setLockId] = useState("");
  const [isIdLock, setIsIdLock] = useState();

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const debounceValue = useDebounce(searchValue, 2000);
  const [toggleMenu, setToggleMenu] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (debounceValue == "") {
      AccountApi.list({page: page, limit: 8}).then((res) => {
        setData(res.data);
        setTotalPage(res.total_page);
        setLoading(false);
      })
    } else 
    {
       AccountApi.listByName({page: page, limit: 8, name: debounceValue}).then((res) => {
        setData(res.data);
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
      title: 'Avatar',
      dataIndex: 'avatarPath',
      key: 'avatarPath',
      render: (item) => (
        <Image className="object-cover rounded-[50%]" width={48} height={48} src={getStorageUrl() + item} alt="avatar"/>
      )
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Verify Status',
      dataIndex: 'isVerified',
      key: 'isVerified',
      align: "center",
      render: (item) => {
        return item ? (<Image alt="" className="m-auto" width={24} height={24} src={"/svg/approved.svg"} />) 
        : (<Image alt="" className="m-auto" width={24} height={24} src={"/svg/deny.svg"} />)
      }
    },
    {
      title: 'Active Status',
      dataIndex: 'isActive',
      key: 'isActive',
      align: "center",
      render: (item) => {
        return item ? (<Image alt="" className="m-auto" width={24} height={24} src={"/svg/approved.svg"} />) 
        : (<Image alt="" className="m-auto" width={24} height={24} src={"/svg/deny.svg"} />)
      }
    },
    {
      title: 'Position',
      dataIndex: 'role',
      key: 'role'
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
            <Image 
              className="cursor-pointer" 
              onClick={() => {
                router.push("/staffs/" + item._id)
              }} 
              alt="" 
              src={"/svg/redirect.svg"} 
              width={24} 
              height={24}
            />
            {!item.isVerified && 
              (
                <Image onClick={() => {setVerifyModal(true); setVerifyEmail(item.email)}} className="cursor-pointer" alt="" src={"/svg/send.svg"} width={24} height={24}/>
              )
            }
            <Image 
              onClick={() => {
                setLockUnlockModal(true);
                setIsIdLock(item.isActive)
                setLockId(item._id)
              }} 
              className="cursor-pointer" 
              alt="" 
              src={item.isActive ? "/svg/lock.svg" : "/svg/unlock.svg"} 
              width={24} 
              height={24}
            />
            <Image onClick={() => {setDeleteModal(true); setDeleteId(item._id)}} className="cursor-pointer" alt="" src={"/svg/trash.svg"} width={24} height={24}/>
          </div>
        )
      }
    }
  ];

  const handleAddStaff = async () => {
    const res = await AccountApi.add({
      fullName: fullName,
      email: email
    }).catch(err => {
      const data = err.response.data;
      if (!!data.message.msg) message.error(data.message.msg);
      else message.error(data.message)
    });

    if (res) {
      message.success("Add staff success!");
      setTimeout(() => router.reload(), 2000);
      return true;
    }
    return false; 
  }

  const handleSendEmail = async () => {
    const res = await AccountApi.sendVerifyEmail({
      email: verifyEmail
    }).catch(err => {
      const data = err.response.data;
      if (!!data.message.msg) message.error(data.message.msg);
      else message.error(data.message)
    });

    if (res) {
      message.success("Send email successed!");
      setTimeout(() => router.reload(), 2000);
      return true;
    }
    return false; 
  }

  const handleLockUnlock = async () => {
    if (isIdLock) {
      const res = await AccountApi.lockAccount({
        account_id: lockId
      }).catch(err => {
        const data = err.response.data;
        if (!!data.message.msg) message.error(data.message.msg);
        else message.error(data.message)
      });

      if (res) {
        message.success("Lock account successed!");
        setTimeout(() => router.reload(), 2000);
        return true;
      }
      return false; 
    } else {
      const res = await AccountApi.unlockAccount({
        account_id: lockId
      }).catch(err => {
        const data = err.response.data;
        if (!!data.message.msg) message.error(data.message.msg);
        else message.error(data.message)
      });

      if (res) {
        message.success("Unlock account successed!");
        setTimeout(() => router.reload(), 2000);
        return true;
      }
      return false; 
    }
  }

  const handleDelete = async () => {
    const res = await AccountApi.deleteAccount({
      id: deleteId
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

  return (
    <>
      <Head>
        <title>Staffs</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} />
        <div className={`p-[32px]`} style={{width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ")"}}>
          <h1 className="font-bold text-2xl mb-[24px]">Staffs Management</h1>
          <div className="flex justify-between gap-[12px] mb-[24px]">
            <Input 
              prefix={<SearchOutlined size={12}/>}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)} 
              placeholder="Find Staffs via Username / Fullname"
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
            pagination={{
              total: totalPage * 8,
              pageSize: 8,
              onChange: (page) => setPage(page)
            }}
            loading={loading}
            dataSource={data}
            columns={columns}
            scroll={{ x: "max-content" }}
          />
        </div>

        <Modal
          title={"Add staff"}
          open={addModal}
          onOk={handleAddStaff}
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

        <Modal
          title={"Send verify email to staff"}
          open={verifyModal}
          onOk={handleSendEmail}
          onCancel={() => {setVerifyModal(false)}}
          loading={true}
          centered
        >
          <p>Are you sure you want to send a verify email to this staff?</p>
        </Modal>

        <Modal
          title={"Delete staff"}
          open={deleteModal}
          onOk={handleDelete}
          onCancel={() => {setDeleteModal(false)}}
          loading={true}
          centered
        >
          <p>Are you sure you want to delete this staff?</p>
        </Modal>
        
        <Modal
          title={"Lock/unlock staff"}
          open={lockUnlockModal}
          onOk={handleLockUnlock}
          onCancel={() => {setLockUnlockModal(false)}}
          loading={true}
          centered
        >
          <p>Are you sure you want to lock/unlock this staff?</p>
        </Modal>
      </main>
    </>
  );
};

export default Staffs;

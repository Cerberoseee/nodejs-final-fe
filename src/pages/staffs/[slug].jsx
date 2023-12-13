import NaviBar from "src/components/NaviBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Modal, message } from "antd";
import { useRouter } from "next/router";
import AccountApi from "../../services/account";
import {getStorageUrl} from "src/misc"
import Head from "next/head";

const StaffDetail = () => {
  const router = useRouter();
  const [id, setId] = useState();
  
  const [toggleMenu, setToggleMenu] = useState(true);
  const [verifyModal, setVerifyModal] = useState(false);
  const [isIdLock, setIsIdLock] = useState();
  const [verifyEmail, setVerifyEmail] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [lockUnlockModal, setLockUnlockModal] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    AccountApi.getById({id: router.query.slug})
    .then((res) => {
      setData(res.data);
      setIsIdLock(res.data.isActive);
      setVerifyEmail(res.data.email);
      setId(router.query.slug);
    }).catch(err => console.log(err))
  }, [])

  const handleLockUnlock = async () => {
    if (isIdLock) {
      const res = await AccountApi.lockAccount({
        account_id: id
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
        account_id: id
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

  return (
    <>
      <Head>
        <title>Staff Details</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} />
        <div className={`p-[32px]`} style={{width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ")"}}>
          <h1 className="font-bold text-2xl mb-[24px]">Staffs Detail</h1>
          <div className="flex gap-[32px]">
            <div className="bg-white p-[24px] rounded-[12px] w-3/4">
              <Image className="object-cover rounded-[50%]" src={!!data.avatarPath ? getStorageUrl() + data.avatarPath : "/avatar-placeholder.jpg"} width={128} height={128} alt="avatar" /> 
              <div className="mt-[24px] flex justify-between w-full">
                <div className="w-1/3">
                  <h3>Fullname:</h3>
                  <p>{data.fullName}</p>
                  <h3>Email:</h3>
                  <p>{data.email}</p>
                </div>
                <div className="w-1/3">
                  <h3>Role:</h3>
                  <p>{data.role}</p>
                  <h3>Joined at:</h3>
                  <p>
                    {(new Date(data.createdAt)).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit"
                    })}
                  </p>
                </div>
                <div className="w-[200px] flex flex-col gap-[32px]">
                  <div className="flex gap-[12px] justify-between">
                    <h3>Verify Status:</h3>
                    {
                      data.isVerified ? (<Image alt="" className="block" width={24} height={24} src={"/svg/approved.svg"} />) 
                      : (<Image alt="" className="block" width={24} height={24} src={"/svg/deny.svg"} />)
                    }
                  </div>
                  
                  <div className="flex gap-[12px] justify-between">
                    <h3>Active Status:</h3>
                    {
                      data.isActive ? (<Image alt="" className="block" width={24} height={24} src={"/svg/approved.svg"} />) 
                      : (<Image alt="" className="block" width={24} height={24} src={"/svg/deny.svg"} />)
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4 bg-white p-[24px] rounded-[12px]">
              <h2 className="text-right">Actions</h2>
              <div className="flex flex-col items-end">
                {
                  !data.isVerified && (
                  <Button onClick={() => setVerifyModal(true)} type="primary" className="w-fit mb-[12px]">
                    <span>Send Verified Email</span>
                  </Button>)
                }
                {
                  data.isActive ? (
                    <Button onClick={() => setLockUnlockModal(true)} type="primary" className="w-fit mb-[12px]">
                      <span>Lock Staff</span>
                    </Button>
                  ) : (
                    <Button onClick={() => setLockUnlockModal(true)} type="primary" className="w-fit mb-[12px]">
                      <span>Unlock Staff</span>
                    </Button>
                  )
                }
                
                <Button onClick={() => setDeleteModal(true)} type="primary" danger className="w-fit">
                  <span>Delete Staff</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

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
  )
}

export default StaffDetail;
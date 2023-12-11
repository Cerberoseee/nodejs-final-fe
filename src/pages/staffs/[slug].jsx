import NaviBar from "src/components/NaviBar";
import { useState } from "react";
import Image from "next/image";
import { Button, Modal } from "antd";

const StaffDetail = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [verifyModal, setVerifyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [lockUnlockModal, setLockUnlockModal] = useState(false);

  const data = {
    key: '1',
    name: "Nguyen Van A",
    avatar: {
      url: "/avatar-placeholder.jpg"
    },
    isVerified: false,
    isActive: false,
    position: "Staff",
    email: "a@gmail.com",
    createdAt: "2023-12-09T14:08:48.000Z"
  }

  return (
    <main className={`flex min-h-screen bg-[#FAF2E3]`}>
      <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
      <div className={`p-[32px]`} style={{width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ")"}}>
        <h1 className="font-bold text-2xl mb-[24px]">Staffs Detail</h1>
        <div className="flex gap-[32px]">
          <div className="bg-white p-[24px] rounded-[12px] w-3/4">
            <Image className="rounded-[50%]" src={data.avatar.url} width={128} height={128} alt="avatar" /> 
            <div className="mt-[24px] flex justify-between w-full">
              <div className="w-1/3">
                <h3>Fullname:</h3>
                <p>{data.name}</p>
                <h3>Email:</h3>
                <p>{data.email}</p>
              </div>
              <div className="w-1/3">
                <h3>Role:</h3>
                <p>{data.position}</p>
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
        onOk={() => {}}
        onCancel={() => {setVerifyModal(false)}}
        loading={true}
        centered
      >
        <p>Are you sure you want to send a verify email to this staff?</p>
      </Modal>

      <Modal
        title={"Delete staff"}
        open={deleteModal}
        onOk={() => {}}
        onCancel={() => {setDeleteModal(false)}}
        loading={true}
        centered
      >
        <p>Are you sure you want to delete this staff?</p>
      </Modal>
      
      <Modal
        title={"Lock/unlock staff"}
        open={lockUnlockModal}
        onOk={() => {}}
        onCancel={() => {setLockUnlockModal(false)}}
        loading={true}
        centered
      >
        <p>Are you sure you want to lock/unlock this staff?</p>
      </Modal>
    </main>
  )
}

export default StaffDetail;
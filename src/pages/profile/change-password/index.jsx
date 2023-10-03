import Image from "next/image";
import NaviBar from "@/components/NaviBar/NaviBar";
import { Input, Button } from "antd";
import { useState } from "react";

const PersonalInfo = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSubmit = () => {
    // console.log(username, email);
  }

  return (
    <main className={`flex min-h-screen bg-[#FAF2E3]`}>
      <NaviBar avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
      <div className="p-[32px] w-full">
        <h1 className="font-bold text-2xl mb-[24px]">Change Password</h1>

        <div className="bg-white rounded-[4px] p-[16px] w-full">
          <div className="mb-[24px]">
            <p className="mb-[12px] font-semibold">Current password *</p>
            <Input.Password
              placeholder="Enter password"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-[24px]">
            <p className="mb-[12px] font-semibold">New password *</p>
            <Input.Password
              placeholder="Enter password"
              size="large"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-[24px]">
            <p className="mb-[12px] font-semibold">Confirmed new password *</p>
            <Input.Password
              placeholder="Enter confirmed password"
              size="large"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </div>
          
        </div>

        <Button
          onClick={handleSubmit}
          type="primary" 
          color="#5FBFEF"
          style={{borderColor: '#5FBFEF'}} 
          size="large" 
          className="mt-[24px] ml-auto block w-fit font-semibold text-[#5FBFEF]"
        >
          Save changes
        </Button>
      </div>
    </main>
  );
}

export default PersonalInfo;
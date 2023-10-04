import Image from "next/image";
import NaviBar from "src/components/NaviBar/NaviBar";
import { Input, Button } from "antd";
import { useState } from "react";

const Staffs = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSubmit = () => {
    // console.log(username, email);
  };

  return (
    <main className={`flex min-h-screen bg-[#FAF2E3]`}>
      <NaviBar avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
      <div className="p-[32px] w-full">
        <h1 className="font-bold text-2xl mb-[24px]">Staff Management</h1>
        
      </div>
    </main>
  );
};

export default Staffs;

import NaviBar from "src/components/NaviBar";
import { Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import AuthApi from "../../../services/auth";
import { useRouter } from "next/router";
import { getStorageUrl } from "../../../misc";

const ChangePassword = () => {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, [])

  const handleSubmit = async () => {
    if (newPassword != confirmedPassword) {
      setNewPassword("");
      setConfirmedPassword("");
      message.error("New password and confirm password must match!");
      return;
    }
    
    const res = await AuthApi.changePassword({
      username: user.username,
      password: password,
      new_password: newPassword
    }).catch((err) => {
      let data = err.response.data;
      if (err.response?.data) {
        if (data.message.msg) {
          message.error(data.message.msg);
          return;
        }
        if (data.message) {
          message.error(data.message);
        }
      }
    })

    if (res) {
      message.success("Password changed success!");
      setTimeout(() => router.reload(), 2000);
    } else {
      message.error("Password changed failed!");
    }
  }

  return (
    <main className={`flex min-h-screen bg-[#FAF2E3]`}>
      {!(user.isFirstTime && user) && <NaviBar onToggle={() => {}}/>}
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

        <div className="flex ml-auto mt-[24px] gap-[12px] justify-end">
          {(user.isFirstTime && user) && (
            <Button
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                router.push("/login");
              }}
              size="large" 
              className="block w-fit font-semibold"
            >
              Logout
            </Button>
          )}

          <Button
            onClick={handleSubmit}
            type="primary" 
            color="#5FBFEF"
            style={{borderColor: '#5FBFEF'}} 
            size="large" 
            className=" block w-fit font-semibold"
          >
            Save changes
          </Button>
        </div>
        
      </div>
    </main>
  );
}

export default ChangePassword;
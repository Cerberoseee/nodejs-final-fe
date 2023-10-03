import Image from "next/image";
import styles from "@/styles/LoginPage.module.scss"
import { Button, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { useState } from "react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(username, password);
  }

  return (
    <main className={`${styles.main} flex items-center`}>
      <div className="ml-auto w-1/3 mr-[36px] bg-[#FFFFFF] rounded-[40px] shadow-md px-[24px] py-[48px] min-w-[300px]">
        <Image src="/svg/logo.svg" width={140} height={172} alt="" className="m-auto" />
        <div className="mt-[24px]">
          <p className="font-semibold mb-[12px]">Username</p>
          <Input 
            size="large" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mt-[24px]">
          <p className="font-semibold mb-[12px]">Password</p>
          <Input.Password 
            size="large"
            placeholder="Password" 
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-[48px]">
          <Button 
            onClick={handleSubmit}
            type="primary" 
            color="#5FBFEF"
            style={{borderColor: '#5FBFEF'}} 
            size="large" 
            className="w-full font-semibold text-[#5FBFEF]"
          >
            Sign In
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Login;
import Image from "next/image";
import styles from "src/styles/LoginPage.module.scss"
import { Button, Input, Space, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Head from "next/head";
import AuthApi from "../../services/auth";

import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    AuthApi.login({
      username: username,
      password: password
    }).then((res) => {
      if (res.status == 200) {
        message.success("Login success!");
        router.push("/profile/personal-info");
      }
    }).catch((err) => {
      console.log(err);
      if (err.response?.data?.status == '0') {
        message.error(err.response?.data?.message);
      }
    })
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={`${styles.main} flex items-center`}>
        <div className="ml-auto w-1/3 mr-[36px] bg-[#FFFFFF] rounded-[40px] shadow-md px-[24px] py-[48px] min-w-[300px]">
          <Image src="/svg/logo.svg" width={140} height={172} alt="" className="m-auto block" />
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
              className="w-full font-semibold"
            >
              Sign In
            </Button>
          </div>
        </div>
      </main>
    </>
   
  )
}

export default Login;
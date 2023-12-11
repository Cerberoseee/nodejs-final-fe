import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Popover } from 'antd';
import { useRouter } from "next/router";

const NaviBar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();

  const content = (
    <div>
      <Link className="block" href="/profile/personal-info">Manage Personal Info</Link>
      <Link className="block" href="/profile/change-password">Change Password</Link>
    </div>
  );

  return (
    <div className={`relative bg-[#8EACBB] flex flex-col justify-between min-h-screen w-1/5 ${toggleMenu ? "max-w-[48px] p-[12px]" : "min-w-[300px] p-[24px]"}`}>
      <div className="flex flex-col items-center">
        {!toggleMenu && <Image src="/svg/logo-alt.svg" width={140} height={140} alt=""/>}
        {!toggleMenu && <div className="w-full bg-[#FAF2E3] h-[1px] mt-[36px]"></div> }
        <div className="mt-[24px] w-full">
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold group items-center"
            href="/product-catalogue"
          >
            <Image src={"/svg/product-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span className="group-hover:translate-x-1 transition">Product Catalogue</span>} 
          </Link>
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold group items-center"
            href="/staffs"
          >
            <Image src={"/svg/customer-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span className="group-hover:translate-x-1 transition ">Staffs</span> }
          </Link>
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold group items-center"
            href="/customers"
          >
            <Image src={"/svg/staff-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span className="group-hover:translate-x-1 transition">Customers</span> }
          </Link>
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold group items-center"
            href="/transactions"
          >
            <Image src={"/svg/transaction-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span className="group-hover:translate-x-1 transition">Transaction Processing</span> }
          </Link>
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold group items-center"
            href="#"
          >
            <Image src={"/svg/report-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span className="group-hover:translate-x-1 transition">Report and Analytics</span> }
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[8px]">
        <div className="flex gap-[12px] items-center">
          <Image src={props.avatar} width={42} height={42} alt="" className={`object-cover rounded-full ${toggleMenu ? "w-[24px] h-[24px]" : ""} `}/>
          {!toggleMenu && <span className="text-[#FAF2E3] font-semibold">{props.name}</span>}
        </div>
        {!toggleMenu && 
          <Popover className="cursor-pointer" content={content} trigger="hover">
            <Image src={"/svg/settings.svg"} width={24} height={24} alt="" />
          </Popover> 
        }
        {!toggleMenu && 
          <Image 
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="cursor-pointer" 
            src={"/svg/sign-out.svg"} 
            width={24} 
            height={24} 
            alt="" 
          /> 
        }
      </div>

      <Image 
        className={`absolute right-[-20px] top-[48px] cursor-pointer hover:scale-110 transition duration-300 ${toggleMenu ? "rotate-180" : ""}`}
        src={"/svg/navi-toggle-btn.svg"}
        width={36}
        height={36}
        alt=""
        onClick={() => {
          setToggleMenu(!toggleMenu)
          props.onToggle();
        }}
      />
    </div>
  )
}

export default NaviBar;
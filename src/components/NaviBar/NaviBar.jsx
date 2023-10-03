import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NaviBar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={`relative bg-[#8EACBB] flex flex-col justify-between min-h-screen w-1/5 ${toggleMenu ? "max-w-[48px] p-[12px]" : "min-w-[275px] p-[24px]"}`}>
      <div className="flex flex-col items-center">
        {!toggleMenu && <Image src="/svg/logo-alt.svg" width={140} height={140} alt=""/>}
        {!toggleMenu && <div className="w-full bg-[#FAF2E3] h-[1px] mt-[36px]"></div> }
        <div className="mt-[24px] w-full">
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold"
            href="#"
          >
            <Image src={"/svg/product-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span>Product Catalogue</span>} 
          </Link>
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold"
            href="#"
          >
            <Image src={"/svg/customer-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span>Staffs</span> }
          </Link>
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold"
            href="#"
          >
            <Image src={"/svg/staff-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span>Customers</span> }
          </Link>
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold"
            href="#"
          >
            <Image src={"/svg/transaction-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span>Transaction Processing</span> }
          </Link>
          <Link 
            className="flex w-full gap-[5px] text-[#FAF2E3] my-[12px] font-semibold"
            href="#"
          >
            <Image src={"/svg/report-logo.svg"} width={24} height={24} alt=""/>
            {!toggleMenu && <span>Report and Analytics</span> }
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[8px]">
        <div className="flex gap-[12px] items-center">
          <Image src={props.avatar} width={42} height={42} alt="" className="rounded-full"/>
          {!toggleMenu && <span className="text-[#FAF2E3] font-semibold">{props.name}</span>}
        </div>
        {!toggleMenu &&<Image src={"/svg/settings.svg"} width={24} height={24} alt="" /> }
        {!toggleMenu &&<Image src={"/svg/sign-out.svg"} width={24} height={24} alt="" /> }
      </div>

      <Image 
        className={`absolute right-[-20px] top-[48px] cursor-pointer ${toggleMenu ? "rotate-180" : ""}`}
        src={"/svg/navi-toggle-btn.svg"}
        width={36}
        height={36}
        alt=""
        onClick={() => setToggleMenu(!toggleMenu)}
      />
    </div>
  )
}

export default NaviBar;
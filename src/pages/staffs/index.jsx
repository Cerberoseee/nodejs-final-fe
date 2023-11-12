import Image from "next/image";
import NaviBar from "src/components/NaviBar/NaviBar";
import { Input, Button, Table } from "antd";
import { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@uidotdev/usehooks";

const Staffs = () => {
  const [addModal, setAddModal] = useState(false); 
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceValue = useDebounce(searchValue, 500);

  return (
    <main className={`flex min-h-screen bg-[#FAF2E3]`}>
      <NaviBar avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
      <div className="p-[32px] w-full">
        <h1 className="font-bold text-2xl mb-[24px]">Staffs Management</h1>
        <div className="flex justify-between gap-[12px] mb-[24px]">
          <Input 
            prefix={<SearchOutlined size={12}/>}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} 
            placeholder="Find Staffs via ID / Name"
          />
          <Button
            icon={<PlusOutlined size={12}/>}
            onClick={() => setAddModal(true)}
            type="primary" 
            color="#5FBFEF"
            style={{borderColor: '#5FBFEF'}} 
            size="large" 
            className="w-fit font-semibold text-[#5FBFEF]"
          >
            Add new
          </Button>
        </div>
        <Table
            
        >

        </Table>
      </div>
    </main>
  );
};

export default Staffs;

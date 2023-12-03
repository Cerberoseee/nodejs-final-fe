import Image from "next/image";
import NaviBar from "src/components/NaviBar/NaviBar";
import { Input, Upload, Button, notification, Form, Table } from "antd";
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import { useState } from "react";

const ProductCatalogue = () => {
  const data = [
    {
      key: '1',
      
    }
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  return (
    <main className={`flex min-h-screen bg-[#FAF2E3]`}>
      <NaviBar avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
      <div className="p-[32px] w-full">
        <h1 className="font-bold text-2xl mb-[24px]">Product Catalogue</h1>
        <Table dataSource={data} columns={columns} />
      </div>
    </main>
  );
}

export default ProductCatalogue;
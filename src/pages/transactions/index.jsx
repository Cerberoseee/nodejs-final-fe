import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message, Form } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import NaviBar from 'src/components/NaviBar';
import Image from "next/image"
import Head from 'next/head';
import { useRouter } from 'next/router';
import InvoiceApi from '../../services/invoice';

const TransactionList = () => {
  const router = useRouter();

  const [toggleMenu, setToggleMenu] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState();
    
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, [])

  useEffect(() => {
    InvoiceApi.list({page: page, limit: 8})
    .then((res) => {
      if (res) {
        setTransactions(res.data);
        setTotalPage(res.total_page);
      }
    })
  }, []);

  const columns = [
    {
      title: 'Phone Number',
      dataIndex: 'customer',
      key: 'customer',
      render: (item) => (
        <span>{item?.phone_number}</span>
      )
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (item) => (
        <span>{item.toLocaleString()} VNĐ</span>
      )
    },
    {
      title: 'Customer Given',
      dataIndex: 'customer_given',
      key: 'customer_given',
      render: (item) => (
        <span>{item.toLocaleString()} VNĐ</span>
      )
    },
    {
      title: 'Paid Back',
      dataIndex: 'paid_back',
      key: 'paid_back',
      render: (item) => (
        <span>{item.toLocaleString()} VNĐ</span>
      )
    },
    {
      title: 'Date Issued',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => (
        <span>{(new Date(item)).toLocaleDateString("vi-VN")}</span>
      )
    },
    {
      title: 'Staff',
      dataIndex: 'account',
      key: 'account',
      render: (item) => (
        <span>{item?.fullName}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span className='flex w-full gap-[12px]'>
          <Image 
            className="cursor-pointer" 
            onClick={() => {
              router.push("/transactions/" + record._id)
            }} 
            alt="" 
            src={"/svg/redirect.svg"}
            width={24} 
            height={24}
          />
          {
            (user && user.role == "Admin") && (
              <Image 
                className="cursor-pointer" 
                onClick={() => {
                  setDeleteId(record._id)
                  setDeleteModalVisible(true)
                }} 
                alt="" 
                src={"/svg/trash.svg"}
                width={24} 
                height={24}
              />
            )
          }
          
        </span>
      ),
    },
  ];

  const handleDelete = async () => {
    const res = await InvoiceApi.deleteInvoice({
      id: deleteId
    }).catch(err => {
      const data = err.response.data;
      if (!!data.message.msg) message.error(data.message.msg);
      else message.error(data.message)
    });

    if (res) {
      message.success("Transaction deleted successed!");
      setTimeout(() => router.reload(), 2000);
      return true;
    }
    return false; 
  }

  return (
    <>
      <Head>
        <title>Transaction Management</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} />
        <div className={`p-[32px]`} style={{ width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ')' }}>
          <div className="flex justify-between items-center gap-[12px] mb-[24px] ">
            <h1 className="font-bold text-2xl mb-0">Transactions Management</h1>
            <Button
              size='large'
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginLeft: 8 }}
              onClick={() => router.push("/transactions/add")}
            >
              Add new transaction
            </Button>
          </div>
          <Table pagination={{total: totalPage*8, pageSize: 8, onChange: (page) => setPage(page)}} scroll={{ x: "max-content" }} dataSource={transactions} columns={columns} />
        </div>

        <Modal
          title="Delete Transaction"
          open={deleteModalVisible}
          onOk={handleDelete}
          onCancel={() => setDeleteModalVisible(false)}
        >
          <p>Are you sure you want to delete this transaction?</p>
        </Modal>
      </main>
    </>

  );
}

export default TransactionList;
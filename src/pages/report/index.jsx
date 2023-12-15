import Image from "next/image";
import NaviBar from "src/components/NaviBar";
import { DatePicker, Button, message, Table } from "antd";
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import { useEffect, useState } from "react";
import {getStorageUrl} from "src/misc"
import { useRouter } from "next/router";
import Head from "next/head";
import ReportApi from "src/services/report";

const PersonalInfo = () => {
  const router = useRouter();

  const [toggleMenu, setToggleMenu] = useState(true);

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState([]);
  const [enable, setEnable] = useState(false);
  const [data, setData] = useState();
  const [invoiceList, setInvoiceList] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await ReportApi.getSalesResult({
      start_time: date[0].$d,
      end_time: date[1].$d,
    }).catch((err) => {
      console.log(err);
      return null;
    })
    if (res) {
      message.success("Retrieved data success!");
      console.log(res);
      setInvoiceList(res.data.invoices);
      setData(res.data);
    } else {
      message.error("Unable to retrieve data");
    }
    setLoading(false);
  }

  useEffect(() => {
    setEnable(date.length == 2)
  }, [date])

  const invoiceColumns = [
    {
      title: 'Issued on',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => (
        <span>
          {(new Date(item)).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })}
        </span>
      )
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Customer Given',
      dataIndex: 'customer_given',
      key: 'customer_given',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Customer Paidback',
      dataIndex: 'paid_back',
      key: 'paid_back',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Staff Issued',
      dataIndex: 'account',
      key: 'account',
      render: (item) => (
        <span>
          {item.fullName}
        </span>
      )
    },
    {
      title: '',
      align: "right",
      render: (_, item) => {
        return (
          <div className="flex justify-end gap-[12px]">
            <Image 
              className="cursor-pointer" 
              onClick={() => {
                router.push("/transactions/" + item._id)
              }} 
              alt="" 
              src={"/svg/redirect.svg"} 
              width={24} 
              height={24}
            />
          </div>
        )
      }
    }
  ];

  return (
    <>
      <Head>
        <title>Report and Analytics</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} />
        <div className={`p-[32px]`} style={{ width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ')' }}>
          <div className="flex justify-between mb-[24px]">
            <h1 className="font-bold text-2xl mb-0">Report And Analytics</h1>
            <div className="flex gap-[12px] justify-end items-center">
              <DatePicker.RangePicker size="large" value={date} onChange={(value) => setDate(value)} format={"DD/MM/YYYY"}/>
              <Button
                disabled={!enable}
                type="primary"
                size="large"
                onClick={handleSubmit}
              >
                Get Result
              </Button>
            </div>
          </div>
          <div className="flex mb-[24px] gap-[12px] justify-between w-full">
            <div className="bg-white rounded-[4px] p-[16px] w-1/3 flex gap-[24px]">
              <div>
                <h3>Total Amount:</h3>
                <span>{(data?.total_amount_order ? data.total_amount_order : 0).toLocaleString()} VNĐ</span>
              </div>
              
              {(!!data?.total_profit) && (
                <div>
                  <h3>Total Profit:</h3>
                  <span>{(data?.total_profit ? data.total_profit : 0).toLocaleString()} VNĐ</span>
                </div>
              )}
            </div>
            <div className="bg-white rounded-[4px] p-[16px] w-1/3">
              <h3>Number of Orders:</h3>
              <span>{data?.number_order ? data.number_order : 0}</span>
            </div>
            <div className="bg-white rounded-[4px] p-[16px] w-1/3">
              <h3>Number of Products:</h3>
              <span>{data?.number_sold_prod ? data.number_sold_prod : 0}</span>
            </div>
          </div>
          <div className="bg-white rounded-[4px] p-[16px] w-full">
            <Table
              scroll={{y: 400, x: 'max-content'}}
              loading={loading}
              dataSource={invoiceList}
              columns={invoiceColumns}
            />
          </div>
        </div>
      </main>
    </>
   
  );
}

export default PersonalInfo;

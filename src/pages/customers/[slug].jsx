import Image from "next/image";
import Head from "next/head";
import { Input, Button, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import NaviBar from "src/components/NaviBar";
import { useRouter } from "next/router";

const CustomerDetails = () => {
  const [editModal, setEditModal] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);  
  const [customerData, setCustomerData] = useState({});

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [toggleMenu, setToggleMenu] = useState(true);
  const [invoiceList, setInvoiceList] = useState([]);

  const router = useRouter();

  

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
      title: 'Product Name',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Import Price',
      dataIndex: 'customer_given',
      key: 'customer_given',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Retail Price',
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
                router.push("/transactions/" + item.id)
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

  useEffect(() => {
    const dummyData = [
      {
        "_id": "6574bdd4db8bc3e8ecdb887b",
        "total_amount": 30000,
        "customer_given": 40000,
        "paid_back": 10000,
        "created_at": "2023-12-09T19:19:48.176Z",
        "account": {
            "_id": "656cea9e97460517974e563e",
            "email": "tranlethaison123@gmail.com",
            "username": "tranlethaison123",
            "fullName": "Son Tran Le",
            "role": "Staff",
            "avatarPath": "/upload/656cea9e97460517974e563e.png",
            "isVerified": true,
            "isActive": true,
            "__v": 0,
            "createdAt": "2023-12-09T19:20:58.359Z"
        },
        "detail_products": [
            {
                "quantity": 1,
                "product": "6572e1e9d974fa728d34d70b",
                "_id": "6574bdd4db8bc3e8ecdb887c"
            }
        ],
        "customer": "65720b2933386ca747239767",
        "__v": 0
      },
      {
        "_id": "6574bdd4db8bc3e8ecdb887b",
        "total_amount": 30000,
        "customer_given": 40000,
        "paid_back": 10000,
        "created_at": "2023-12-09T19:19:48.176Z",
        "account": {
            "_id": "656cea9e97460517974e563e",
            "email": "tranlethaison123@gmail.com",
            "username": "tranlethaison123",
            "fullName": "Son Tran Le",
            "role": "Staff",
            "avatarPath": "/upload/656cea9e97460517974e563e.png",
            "isVerified": true,
            "isActive": true,
            "__v": 0,
            "createdAt": "2023-12-09T19:20:58.359Z"
        },
        "detail_products": [
            {
                "quantity": 1,
                "product": "6572e1e9d974fa728d34d70b",
                "_id": "6574bdd4db8bc3e8ecdb887c"
            }
        ],
        "customer": "65720b2933386ca747239767",
        "__v": 0
      },
      {
        "_id": "6574bdd4db8bc3e8ecdb887b",
        "total_amount": 30000,
        "customer_given": 40000,
        "paid_back": 10000,
        "created_at": "2023-12-09T19:19:48.176Z",
        "account": {
            "_id": "656cea9e97460517974e563e",
            "email": "tranlethaison123@gmail.com",
            "username": "tranlethaison123",
            "fullName": "Son Tran Le",
            "role": "Staff",
            "avatarPath": "/upload/656cea9e97460517974e563e.png",
            "isVerified": true,
            "isActive": true,
            "__v": 0,
            "createdAt": "2023-12-09T19:20:58.359Z"
        },
        "detail_products": [
            {
                "quantity": 1,
                "product": "6572e1e9d974fa728d34d70b",
                "_id": "6574bdd4db8bc3e8ecdb887c"
            }
        ],
        "customer": "65720b2933386ca747239767",
        "__v": 0
      },
      {
        "_id": "6574bdd4db8bc3e8ecdb887b",
        "total_amount": 30000,
        "customer_given": 40000,
        "paid_back": 10000,
        "created_at": "2023-12-09T19:19:48.176Z",
        "account": {
            "_id": "656cea9e97460517974e563e",
            "email": "tranlethaison123@gmail.com",
            "username": "tranlethaison123",
            "fullName": "Son Tran Le",
            "role": "Staff",
            "avatarPath": "/upload/656cea9e97460517974e563e.png",
            "isVerified": true,
            "isActive": true,
            "__v": 0,
            "createdAt": "2023-12-09T19:20:58.359Z"
        },
        "detail_products": [
            {
                "quantity": 1,
                "product": "6572e1e9d974fa728d34d70b",
                "_id": "6574bdd4db8bc3e8ecdb887c"
            }
        ],
        "customer": "65720b2933386ca747239767",
        "__v": 0
      },
      {
        "_id": "6574bdd4db8bc3e8ecdb887b",
        "total_amount": 30000,
        "customer_given": 40000,
        "paid_back": 10000,
        "created_at": "2023-12-09T19:19:48.176Z",
        "account": {
            "_id": "656cea9e97460517974e563e",
            "email": "tranlethaison123@gmail.com",
            "username": "tranlethaison123",
            "fullName": "Son Tran Le",
            "role": "Staff",
            "avatarPath": "/upload/656cea9e97460517974e563e.png",
            "isVerified": true,
            "isActive": true,
            "__v": 0,
            "createdAt": "2023-12-09T19:20:58.359Z"
        },
        "detail_products": [
            {
                "quantity": 1,
                "product": "6572e1e9d974fa728d34d70b",
                "_id": "6574bdd4db8bc3e8ecdb887c"
            }
        ],
        "customer": "65720b2933386ca747239767",
        "__v": 0
      },
      {
        "_id": "6574bdd4db8bc3e8ecdb887b",
        "total_amount": 30000,
        "customer_given": 40000,
        "paid_back": 10000,
        "created_at": "2023-12-09T19:19:48.176Z",
        "account": {
            "_id": "656cea9e97460517974e563e",
            "email": "tranlethaison123@gmail.com",
            "username": "tranlethaison123",
            "fullName": "Son Tran Le",
            "role": "Staff",
            "avatarPath": "/upload/656cea9e97460517974e563e.png",
            "isVerified": true,
            "isActive": true,
            "__v": 0,
            "createdAt": "2023-12-09T19:20:58.359Z"
        },
        "detail_products": [
            {
                "quantity": 1,
                "product": "6572e1e9d974fa728d34d70b",
                "_id": "6574bdd4db8bc3e8ecdb887c"
            }
        ],
        "customer": "65720b2933386ca747239767",
        "__v": 0
      },
      {
        "_id": "6574bdd4db8bc3e8ecdb887b",
        "total_amount": 30000,
        "customer_given": 40000,
        "paid_back": 10000,
        "created_at": "2023-12-09T19:19:48.176Z",
        "account": {
            "_id": "656cea9e97460517974e563e",
            "email": "tranlethaison123@gmail.com",
            "username": "tranlethaison123",
            "fullName": "Son Tran Le",
            "role": "Staff",
            "avatarPath": "/upload/656cea9e97460517974e563e.png",
            "isVerified": true,
            "isActive": true,
            "__v": 0,
            "createdAt": "2023-12-09T19:20:58.359Z"
        },
        "detail_products": [
            {
                "quantity": 1,
                "product": "6572e1e9d974fa728d34d70b",
                "_id": "6574bdd4db8bc3e8ecdb887c"
            }
        ],
        "customer": "65720b2933386ca747239767",
        "__v": 0
      },
    ];

    const data = {
      phone_number: "09123123123",
      name: "Le Van Testing",
      address: "123 Le Van Luong, Tan Phong, Quan 7, Thanh pho Ho Chi Minh"
    }
    
    setCustomerData(data);

    setPhoneNumber(data.phone_number);
    setFullName(data.name);
    setAddress(data.address);

    setInvoiceList(dummyData);
  }, []); // Fetch data on component mount
 

  return (
    <>
      <Head>
        <title>Customers Details</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
        <div className={`p-[32px]`} style={{width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ")"}}>
          <h1 className="font-bold text-2xl mb-[24px]">Customers Management</h1>
            <div className="flex gap-[32px]">
              <div className="w-3/4 bg-white p-[24px] rounded-[12px] flex justify-between">
                <div className="w-1/2">
                  <h3>Phone number:</h3>
                  <p>{customerData.phone_number}</p>
                  <h3>Name:</h3>
                  <p>{customerData.name}</p>
                </div>
                <div className="w-1/2">
                  <h3>Address:</h3>
                  <p>{customerData.address}</p>
                </div>
              </div>
              <div className="w-1/4 bg-white p-[24px] rounded-[12px]">
                <h2 className="text-right">Actions</h2>
                <div className="flex flex-col items-end">
                  <Button onClick={() => setEditModal(true)} type="primary" className="w-fit mb-[12px]">
                    <span>Edit Customer</span>
                  </Button >
                  <Button  onClick={() => setDeleteModal(true)}  type="primary" danger className="w-fit">
                    <span>Delete Customer</span>
                  </Button>
                </div>
              </div>
            </div>
            <div
              className="mt-[32px]"
            >
              <h3>Issued Orders</h3>
              <Table
                className="mt-[16px]"
                scroll={{ x: "max-content" }} 
                dataSource={invoiceList} 
                columns={invoiceColumns} 
              />
            </div>

        </div>

        <Modal
          title={"Edit Customer"}
          open={editModal}
          onOk={() => {}}
          onCancel={() => {setEditModal(false)}}
          centered

        >
          <p className="text-[16px] mt-[16px]">Phone Number</p>
          <Input 
            disabled
            size="large"
            className="mb-[12px]"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} 
            placeholder="Enter phone number"
          />
          <p className="text-[16px] mt-[16px]">Fullname</p>
          <Input 
            size="large"
            className="mb-[12px]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} 
            placeholder="Enter fullname"
          />
          <p className="text-[16px]">Email</p>
          <Input 
            size="large"
            value={address}
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter address"
          />
        </Modal>

        <Modal
          title={"Delete Customer"}
          open={deleteModal}
          onOk={() => {}}
          onCancel={() => {setDeleteModal(false)}}
          centered
        >
          <p>Are you sure you want to delete this customer?</p>
        </Modal>
      </main>
    </>
  );
};

export default CustomerDetails;

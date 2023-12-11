import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message, Form } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import NaviBar from 'src/components/NaviBar';
import Head from 'next/head';
import BarcodeScanner from '../../../components/BarcodeScanner/BarcodeScanner';
import Image from 'next/image';

const TransactionList = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchProductTerm, setSearchProductTerm] = useState('');
  const [toggleMenu, setToggleMenu] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerGiven, setCustomerGiven] = useState();
  const [customerPayback, setCustomerPayback] = useState();
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const [phone, setPhoneNumber] = useState();
  const [customerFullname, setCustomerFullname] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [addCustomerModal, setAddCustomerModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        barcode: 1,
        name: 'Product A',
        import_price: 10,
        retail_price: 20000,
        category: 'Category A',
        created_at: '2023-01-01',
        stock_quantity: 1,
        isInOrder: false,
      },
      {
        id: 2,
        barcode: 1,
        name: 'Product B',
        import_price: 10,
        retail_price: 20,
        category: 'Category A',
        created_at: '2023-01-01',
        stock_quantity: 2,
        isInOrder: false,
      },
      {
        id: 3,
        barcode: 1,
        name: 'Product C',
        import_price: 10,
        retail_price: 20,
        category: 'Category A',
        created_at: '2023-01-01',
        stock_quantity: 1,
        isInOrder: false,
      },
      {
        id: 4,
        barcode: 1,
        name: 'Product D',
        import_price: 10,
        retail_price: 20,
        category: 'Category A',
        created_at: '2023-01-01',
        stock_quantity: 1,
        isInOrder: false,
      }
    ];

    const customerData = [
      {
        key: '1',
        phone_number: "0123123123",
        name: "Nguyen Van Test"
      },
      {
        key: '2',
        phone_number: "0123123123",
        name: "Nguyen Van Test"
      },
      {
        key: '3',
        phone_number: "0123123123",
        name: "Nguyen Van Test"
      },
      {
        key: '4',
        phone_number: "0123123123",
        name: "Nguyen Van Test"
      },
    ]

    setCustomers(customerData);
    setProducts(dummyData);
  }, []); // Fetch data on component mount

  const invoiceColumns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Unit Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      render: (item) => (
        <span>
          {item.toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Amount',
      render: (_, item) =>  (
        <span>
          {(item.quantity * item.retail_price).toLocaleString() + " VNĐ"}
        </span>
      )
    },
    {
      align: "right",
      width: 64,
      render: (_, item, index) => (
        <Image 
          className='cursor-pointer' 
          onClick={() => {
            let newSeletectedProduct = selectedProduct.filter((obj) => obj.id != item.id);
            setSelectedProduct([...newSeletectedProduct]);
            setTotalAmount(totalAmount - item.retail_price * item.quantity)
          }} 
          src={"/svg/trash.svg"} 
          width={24}
          height={24} 
          alt='' 
        />
      )
    }
  ];

  const productColumns = [
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Retail Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      render: (item) => (
        <span>{item.toLocaleString()} VNĐ</span>
      )
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stock_quantity',
      key: 'stock_quantity',
    }
  ];

  const customerColumns = [
     {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Fullname',
      dataIndex: 'name',
      key: 'name',
    }
  ]

  const handleDeleteProduct = () => {
    
  }

  return (
    <>
      <Head>
        <title>Transaction Management</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
        <div className={`p-[32px]`} style={{ width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ')' }}>
          <h1 className="font-bold text-2xl mb-[24px]">Add new Transaction</h1>
          <div className="flex justify-between gap-[12px] mb-[24px]">
            <div className='w-1/2'>
              <Table style={{ height: '550px' }} columns={invoiceColumns} scroll={{y: 550}} dataSource={selectedProduct}/>
              <div>
                <div className='flex justify-between'>
                  <h3>Total Amount:</h3>
                  <h2>{totalAmount.toLocaleString()} VNĐ</h2>
                </div>  

                <div className='mb-[12px]'>
                  <h3>Customer Given:</h3>
                  <Input 
                    value={customerGiven} 
                    onChange={(e) => {
                      setCustomerGiven(e.target.value);
                      if (parseFloat(e.target.value) - parseFloat(totalAmount) > 0)
                        setCustomerPayback(parseFloat(e.target.value) - parseFloat(totalAmount));
                    }} 
                    placeholder='Enter customer given amount' 
                  />
                </div>


                <div className='mb-[24px]'>
                  <h3>Customer Payback:</h3>
                  <Input 
                    value={customerPayback} 
                    onChange={(e) => setCustomerPayback(e.target.value)} 
                    placeholder='Enter customer payback' 
                  />
                </div>

                
              </div>
            </div>

            <div className='w-1/2'>
              <Input value={searchProductTerm} onChange={(e) => setSearchProductTerm(e.target.value)} className='mb-[12px]' size='large' placeholder='Enter product barcode or name' />
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      let obj = selectedProduct.find((item) => item.id == record.id);
                      if (obj) {
                        let new_quantity = obj.quantity + 1;
                        if (record.stock_quantity < new_quantity) {
                          message.error("Cannot add this item because it is out of stock");
                          return;
                        }
                        setSelectedProduct([...selectedProduct.filter((obj) => obj.id != record.id), {quantity: new_quantity, ...record}]);
                        setTotalAmount(totalAmount + record.retail_price * new_quantity);
                      } else {
                        setSelectedProduct([...selectedProduct, {quantity: 1, ...record}])
                        setTotalAmount(totalAmount + record.retail_price);
                      }                     
                    },
                  };
                }}
                scroll={{y: 200}} 
                columns={productColumns} 
                dataSource={products}
              />
              <div className='flex gap-[12px]'>
                <Input value={phone} onChange={(e) => setPhoneNumber(e.target.value)} className='mb-[12px]' size='large' placeholder='Enter customer phone' />
                <Button 
                  // disabled={!isNewCustomer}
                  onClick={() => setAddCustomerModal(true)}
                  type='primary' 
                  size='large'
                >
                  Create Customer
                </Button>  
              </div>
              <Table scroll={{y: 200}} columns={customerColumns} dataSource={customers}/>
            </div>
          </div>

          <Button type='primary' size='large' className='float-right'>
            Create Transaction
          </Button>

          <BarcodeScanner onDetected={(result) => {
            setSearchProductTerm(result);
          }}/>
          
          <Modal
            title={"Add Customer"}
            open={addCustomerModal}
            onOk={() => {}}
            onCancel={() => {setAddCustomerModal(false)}}
            centered
          >
            <p className="text-[16px] mt-[16px]">Phone Number</p>
            <Input 
              size="large"
              className="mb-[12px]"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="Enter phone number"
            />
            <p className="text-[16px] mt-[16px]">Fullname</p>
            <Input 
              size="large"
              className="mb-[12px]"
              value={customerFullname}
              onChange={(e) => setCustomerFullname(e.target.value)} 
              placeholder="Enter fullname"
            />
            <p className="text-[16px]">Email</p>
            <Input 
              size="large"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)} 
              placeholder="Enter address"
            />
          </Modal>
        </div>
      </main>
    </>

  );
}

export default TransactionList;
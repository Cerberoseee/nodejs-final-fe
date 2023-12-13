import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Input, message, Form } from 'antd';
import NaviBar from 'src/components/NaviBar';
import Head from 'next/head';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';

import {PrintComponent} from 'src/components/PrintComponent';
import BarcodeScanner from 'src/components/BarcodeScanner/BarcodeScanner';

import CustomerApi from "src/services/customer"
import ProductApi from "src/services/product"
import InvoiceApi from "src/services/invoice"

import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from 'next/router';

const TransactionAdd = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [staff, setStaff] = useState({});

  const [summaryModal, setSummaryModal] = useState(false);

  const [searchProductTerm, setSearchProductTerm] = useState('');
  const [searchCustomerTerm, setSearchCustomerTerm] = useState('');

  const [scanId, setScanId] = useState("");

  const debounceSearchProduct = useDebounce(searchProductTerm, 2000);
  const debounceSearchCustomer = useDebounce(searchCustomerTerm, 2000);
  const debounceScanId = useDebounce(scanId, 1000);

  const [toggleMenu, setToggleMenu] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerGiven, setCustomerGiven] = useState(0);
  const [customerPayback, setCustomerPayback] = useState(0);
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const [customerPhone, setCustomerPhone] = useState("");
  const [customerFullname, setCustomerFullname] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [addCustomerModal, setAddCustomerModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  const [customerPagination, setCustomerPagination] = useState({
    page: 1,
    totalPage: 1
  })

  const [productPagination, setProductPagination] = useState({
    page: 1,
    totalPage: 1
  })

  const [isAbleCreate, setIsAbleCreate] = useState(false);
  
  useEffect(() => {
    setStaff(JSON.parse(localStorage.getItem("user")));
  }, [])

  useEffect(() => {
    if (debounceSearchCustomer == "") {
      CustomerApi.list({limit: 4, page: customerPagination.page})
      .then((res) => {
        if (res) {
          setIsNewCustomer(false);
          setCustomers(res.data);
          setCustomerPagination({...customerPagination, totalPage: res.total_page})
        }
      })
      .catch(err => console.log(err))
    } else {
      CustomerApi.search({limit: 4, page: customerPagination.page, name: debounceSearchCustomer})
      .then((res) => {
        if (res) {
          if (res.data.length == 0) setIsNewCustomer(true);
          else setIsNewCustomer(false);
          setCustomers(res.data);
          setCustomerPagination({...customerPagination, totalPage: res.total_page})
        }
      })
      .catch(err => console.log(err))
    }
    
  }, [debounceSearchCustomer, customerPagination.page, selectedCustomer])
  
  useEffect(() => {
    setCustomerPagination({...customerPagination, page: 1})
  }, [debounceSearchCustomer])

  useEffect(() => {
    if (debounceSearchProduct == "") {
      ProductApi.list({limit: 4, page: productPagination.page})
      .then((res) => {
        if (res) {
          setProducts(res.data);
          setProductPagination({...productPagination, totalPage: res.total_page})
        }
      })
    } else {    
      ProductApi.listByName({limit: 4, page: productPagination.page, name: debounceSearchProduct})
      .then((res) => {
        if (res) {
          setProducts(res.data);
          setProductPagination({...productPagination, totalPage: res.total_page})
        }
      })
    }
  }, [debounceSearchProduct, productPagination.page])

  useEffect(() => {
    setProductPagination({...productPagination, page: 1})
  }, [debounceSearchProduct])

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
      render: (_, item) => (
        <Image 
          className='cursor-pointer' 
          onClick={() => {
            let newSeletectedProduct = selectedProduct.filter((obj) => obj._id != item._id);
            setSelectedProduct([...newSeletectedProduct]);
            console.log(selectedProduct);
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

  useEffect(() => {
    if (debounceScanId != "") {
      ProductApi.listByName({name: debounceScanId})
      .then((res) => {
        setScanId("");
        if (res) {
          console.log(res);
          if (res.data.length > 0) {
            let newData = res.data[0];
            newData.quantity = 1;
            let obj = selectedProduct.find((item) => item._id == newData._id);
            if (obj) {
              let new_quantity = obj.quantity + 1;
              if (newData.stock_quantity < new_quantity) {
                message.error("Cannot add this item because it is out of stock");
                return;
              }
              newData.quantity = new_quantity;
              setSelectedProduct([...selectedProduct.filter((obj) => obj._id != newData._id), newData]);
              setTotalAmount(totalAmount + newData.retail_price);
              message.success("Product added!");
            } else {
              setSelectedProduct([...selectedProduct, {quantity: 1, ...newData}])
              setTotalAmount(totalAmount + newData.retail_price);
              message.success("Product added!");
            }
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
    }   
  }, [debounceScanId])


  const handleDetected = async (result) => {
    setScanId(result);
    console.log(result);
  }

  const handleAddCustomer = async () => {
    const res = await CustomerApi
    .add({
      phone_number: customerPhone,
      address: customerAddress,
      name: customerFullname
    })
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Customer added success!");
      setSelectedCustomer(res.data);
    } else {
      message.error("Customer added failed!");
    }
    setAddCustomerModal(false);
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSubmit = async () => {
    let params = {
      total_amount: parseFloat(totalAmount),
      customer_given: parseFloat(customerGiven),
      paid_back: parseFloat(customerPayback),
      account: staff?._id,
      detail_products: selectedProduct.map((item) => item._id),
      detail_products_quantity: selectedProduct.map((item) => item.quantity),
      customer: selectedCustomer._id
    }

    const res = await InvoiceApi
    .addInvoice(params)
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Transaction added success!");
      handlePrint();
      setTimeout(() => router.push("/transactions"), 2000);
    } else {
      message.error("Transaction added failed!");
    }
  }

  useEffect(() => {
    setIsAbleCreate(( 
      selectedProduct.length > 0 
      && Object.keys(selectedCustomer).length !== 0 
      && customerGiven > 0
      && customerPayback > 0
    ))
  }, [selectedProduct, selectedCustomer, customerGiven, customerPayback])


  return (
    <>
      <Head>
        <title>Transaction Management</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} />
        <div className={`p-[32px]`} style={{ width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ')' }}>
          <div className='flex justify-between'>
            <h1 className="font-bold text-2xl mb-[24px]">Add new Transaction</h1>
            <Button onClick={() => setSummaryModal(true)} disabled={!isAbleCreate} type='primary' size='large' className='float-right'>
              Create Transaction
            </Button>
          </div>
          <div className="flex justify-between gap-[12px] mb-[24px]">
            <div className='w-1/2'>
              <Table style={{ height: '500px' }} columns={invoiceColumns} scroll={{y: 500}} dataSource={selectedProduct}/>
              <div>
                <div className='flex justify-between'>
                  <h3>Selected Customer Phone:</h3>
                  <p>{!!selectedCustomer && !!selectedCustomer.phone_number ? selectedCustomer.phone_number : "Not selected yet"}</p>
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

                <div className='flex justify-between'>
                  <h3>Total Amount:</h3>
                  <h2>{totalAmount.toLocaleString()} VNĐ</h2>
                </div>  
              </div>
            </div>

            <div className='w-1/2'>
              <Input value={searchProductTerm} onChange={(e) => setSearchProductTerm(e.target.value)} className='mb-[12px]' size='large' placeholder='Enter product barcode or name' />
              <Table
                rowClassName="cursor-pointer" 
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      let obj = selectedProduct.find((item) => item._id == record._id);
                      if (obj) {
                        let new_quantity = obj.quantity + 1;
                        if (record.stock_quantity < new_quantity) {
                          message.error("Cannot add this item because it is out of stock");
                          return;
                        }
                        setSelectedProduct([...selectedProduct.filter((obj) => obj._id != record._id), {quantity: new_quantity, ...record}]);
                        setTotalAmount(totalAmount + record.retail_price);
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
                pagination={{
                  total: productPagination.totalPage * 4,
                  pageSize: 4,
                  onChange: (page) => setProductPagination({...productPagination, page: page})
                }}
              />
              <div className='flex gap-[12px]'>
                <Input value={searchCustomerTerm} onChange={(e) => setSearchCustomerTerm(e.target.value)} className='mb-[12px]' size='large' placeholder='Enter customer phone' />
                <Button 
                  disabled={!isNewCustomer}
                  onClick={() => {
                    setAddCustomerModal(true);
                    setCustomerPhone(searchCustomerTerm);
                  }}
                  type='primary' 
                  size='large'
                >
                  Create Customer
                </Button>  
              </div>
              <Table
                rowClassName="cursor-pointer" 
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      setSelectedCustomer(record)
                    }
                  }
                }} 
                scroll={{y: 200}} 
                columns={customerColumns} 
                dataSource={customers}
                pagination={{
                  total: customerPagination.totalPage * 4,
                  pageSize: 4,
                  onChange: (page) => setCustomerPagination({...customerPagination, page: page})
                }}
              />
            </div>
          </div>

          <BarcodeScanner onDetected={handleDetected}/>
          
          <Modal
            title="Transaction Summary"
            open={summaryModal}
            onOk={handleSubmit}
            onCancel={() => {
              setSummaryModal(false)
            }}
            centered
          >
            <div className='flex justify-between'>
              <h4>Customer Phone:</h4>
              <p>{selectedCustomer.phone_number}</p>
            </div>  
            <div className='flex justify-between'>
              <h4>Total Amount</h4>
              <p>{parseFloat(totalAmount || 0).toLocaleString()} VNĐ</p>
            </div>
            <div className='flex justify-between'>
              <h4>Customer Given</h4>
              <p>{parseFloat(customerGiven || 0).toLocaleString()} VNĐ</p>
            </div>

            <div className='flex justify-between'>
              <h4>Customer Payback</h4>
              <p>{parseFloat(customerPayback || 0).toLocaleString()} VNĐ</p>
            </div>

          </Modal>

          <Modal
            title={"Add Customer"}
            open={addCustomerModal}
            onOk={handleAddCustomer}
            onCancel={() => {
              setAddCustomerModal(false)
            }}
            centered
          >
            <p className="text-[16px] mt-[16px]">Phone Number</p>
            <Input 
              size="large"
              className="mb-[12px]"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)} 
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
            <p className="text-[16px]">Address</p>
            <Input 
              size="large"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)} 
              placeholder="Enter address"
            />
          </Modal>
          <div className='hidden'>
            <PrintComponent 
              customer={selectedCustomer.name}
              staff={staff?.fullName}
              ref={componentRef} 
              products={selectedProduct} 
              totalAmount={totalAmount}
              customerGiven={customerGiven}
              customerPayback={customerPayback} 
            />
          </div>
          
        </div>
      </main>
    </>

  );
}

export default TransactionAdd;
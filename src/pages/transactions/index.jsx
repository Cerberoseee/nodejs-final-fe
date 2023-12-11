import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message, Form } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import NaviBar from 'src/components/NaviBar';
import Image from "next/image"
import Head from 'next/head';
import { useRouter } from 'next/router';


const TransactionList = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toggleMenu, setToggleMenu] = useState(true);

  const [addProductModalVisible, setAddProductModalVisible] = useState(false); 
  const [updateProductModalVisible, setUpdateProductModalVisible] = useState(false);
  const [deleteProductModalVisible, setDeleteProductModalVisible] = useState(false);

  const [updateProduct, setUpdateProduct] = useState({});
  const [deleteProduct, setDeleteProduct] = useState();
  const [addForm, updateForm] = Form.useForm();

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        barcode: 1,
        name: 'Product A',
        import_price: 10,
        retail_price: 20,
        category: 'Category A',
        created_at: '2023-01-01',
        stock_quantity: 1,
        isInOrder: false,
      },
    ];

    setProducts(dummyData);
  }, []); // Fetch data on component mount

  const columns = [
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
      title: 'Import Price',
      dataIndex: 'import_price',
      key: 'import_price',
    },
    {
      title: 'Retail Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Imported Date',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span className='flex w-full gap-[12px]'>
          <Image 
            className="cursor-pointer" 
            onClick={() => {
              setUpdateProduct(record);
              setUpdateProductModalVisible(true)
            }} 
            alt="" 
            src={"/svg/edit.svg"} 
            width={24} 
            height={24}
          />
          <Image 
            className="cursor-pointer" 
            onClick={() => {
              setDeleteProduct(record.id)
              setDeleteProductModalVisible(true)
            }} 
            alt="" 
            src={"/svg/trash.svg"}
            width={24} 
            height={24}
          />
        </span>
      ),
    },
  ];

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
          <h1 className="font-bold text-2xl mb-[24px]">Transactions Management</h1>
          <div className="flex justify-between gap-[12px] mb-[24px]">
            <Input
              placeholder="Find transaction by barcode"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Button
              size='large'
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginLeft: 8 }}
              onClick={() => router.push("/transactions/add")} // Open the add product modal
            >
              Add new transaction
            </Button>
          </div>
          <Table  scroll={{ x: "max-content" }} dataSource={products} columns={columns} />
        </div>
        

        {/* Modal for viewing product details */}
        
        <Modal
          title="Update Product"
          open={updateProductModalVisible}
          onOk={() => updateForm.submit()}
          onCancel={() => setUpdateProductModalVisible(false)}
        >
          <Form form={addForm} layout='vertical'>
            <Form.Item label="Product Name">
              <Input
                name='name'
                placeholder='Enter product name'
                value={updateProduct.name}
                onChange={(e) => {setUpdateProduct({...updateProduct, name: e.target.value})}}
              />
            </Form.Item>
            <Form.Item label="Import Price">
              <Input
                name='import_price'
                placeholder='Enter import price of product'
                value={updateProduct.import_price}
                onChange={(e) => {setUpdateProduct({...updateProduct, import_price: e.target.value})}}
              />
            </Form.Item>
            <Form.Item label="Retail Price">
              <Input
                name='retail_price'
                placeholder='Enter retail price of product'
                value={updateProduct.retail_price}
                onChange={(e) => {setUpdateProduct({...updateProduct, retail_price: e.target.value})}}
              />
            </Form.Item>
            <Form.Item label="Category">
              <Input
                name='category'
                placeholder='Enter product category'
                value={updateProduct.category}
                onChange={(e) => {setUpdateProduct({...updateProduct, category: e.target.value})}}
              />
            </Form.Item>
            <Form.Item label="Stock Quantity">
              <Input
                type='number'
                name='stock_quantity'
                placeholder='Enter product stock quantity'
                value={updateProduct.stock_quantity}
                onChange={(e) => {setUpdateProduct({...updateProduct, stock_quantity: e.target.value})}}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Add Product"
          open={addProductModalVisible}
          onOk={() => addForm.submit()}
          onCancel={() => setAddProductModalVisible(false)}
        >
          <Form form={addForm} layout='vertical'>
            <Form.Item label="Product Name">
              <Input
                name='name'
                placeholder='Enter product name'
              />
            </Form.Item>
            <Form.Item label="Import Price">
              <Input
                name='import_price'
                placeholder='Enter import price of product'
              />
            </Form.Item>
            <Form.Item label="Retail Price">
              <Input
                name='retail_price'
                placeholder='Enter retail price of product'
              />
            </Form.Item>
            <Form.Item label="Category">
              <Input
                name='category'
                placeholder='Enter product category'
              />
            </Form.Item>
            <Form.Item label="Stock Quantity">
              <Input
                name='stock_quantity'
                placeholder='Enter product stock quantity'
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Delete Product"
          open={deleteProductModalVisible}
          onOk={handleDeleteProduct}
          onCancel={() => setDeleteProductModalVisible(false)}
        >
          <p>Are you sure you want to delete this product?</p>
        </Modal>
      </main>
    </>

  );
}

export default TransactionList;
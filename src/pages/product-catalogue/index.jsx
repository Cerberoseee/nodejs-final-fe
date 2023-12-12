import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message, Form } from 'antd';
import { PlusOutlined, SearchOutlined, ScanOutlined } from '@ant-design/icons';
import NaviBar from 'src/components/NaviBar';
import Image from "next/image"
import Head from 'next/head';
import ProductApi from "src/services/product"
import { useDebounce } from "@uidotdev/usehooks";
import Barcode from 'react-barcode';
import { useRouter } from 'next/router';
import BarcodeScanner from "src/components/BarcodeScanner/BarcodeScanner"

const ProductCatalog = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [scanner, setScanner] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const debounceValue = useDebounce(searchTerm, 2000);

  const [toggleMenu, setToggleMenu] = useState(true);

  const [addProductModalVisible, setAddProductModalVisible] = useState(false); 
  const [updateProductModalVisible, setUpdateProductModalVisible] = useState(false);
  const [deleteProductModalVisible, setDeleteProductModalVisible] = useState(false);

  const [updateProduct, setUpdateProduct] = useState({});
  const [deleteId, setDeleteId] = useState();
  
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [addForm] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    if (debounceValue == "") {
      ProductApi.listAdmin({page: page, limit: 6}).then((res) => {
        if (res) {
          let newData = res.data.map((item) => {
            return {
              ...item,
              key: item._id
            }
          })
          setProducts(newData);
          setTotalPage(res.total_page);
          setLoading(false);
        }
        
      })
    } else 
    {
      ProductApi.listByNameAdmin({page: page, limit: 6, name: debounceValue}).then((res) => {
        if (res) {
          let newData = res.data.map((item) => {
            return {
              ...item,
              key: item._id
            }
          })
          setProducts(newData);
          setTotalPage(res.total_page);
          setLoading(false);
        }
      })
    }
  }, [page, debounceValue])

  useEffect(() => {
    setPage(1);
  }, [debounceValue])
  

  const columns = [
    {
      title: 'Barcode',
      dataIndex: '_id',
      key: '_id',
      align: "center",
      render: (item) => (
        <Barcode width={1} height={40} fontSize={12} value={item} />
      )
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
      align: "center",
      render: (item) => (
        <span>{item.toLocaleString()} VNĐ</span>
      )
    },
    {
      title: 'Retail Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      align: "center",
      render: (item) => (
        <span>{item.toLocaleString()} VNĐ</span>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: "center",
      key: 'category',
    },
    {
      title: 'Imported Date',
      dataIndex: 'created_at',
      align: "center",
      key: 'created_at',
      render: (item) => (
        <span>{(new Date(item)).toLocaleDateString("vi-VN")}</span>
      )
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stock_quantity',
      key: 'stock_quantity',
      align: "center",
    },
    {
      title: 'Action',
      key: 'action',
      align: "right",
      render: (_, record) => (
        <span className='flex w-full gap-[12px]'>
          <Image 
            className="cursor-pointer" 
            onClick={() => {
              setUpdateProduct({...record});
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
              setDeleteId(record._id)
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

  const handleDelete = async () => {
    const res = await ProductApi
    .deleteProduct({id: deleteId})
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Product deleted success!");
      setTimeout(() => router.reload(), 2000);
    } else {
      message.error("Product deleted failed!");
    }
  }

  const handleAdd = async (value) => {
    const res = await ProductApi
    .add(value)
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Product added success!");
      setTimeout(() => router.reload(), 2000);
    } else {
      message.error("Product added failed!");
    }
  }

  const handleUpdate = async () => {
    const res = await ProductApi
    .editProduct({...updateProduct, id: updateProduct._id})
    .catch((err) => {
      const data = err.response.data;
      if (!!data.err.msg) message.error(data.err.msg);
      else message.error(data.message)
    });
    if (res) {
      message.success("Product updated success!");
      setTimeout(() => router.reload(), 2000);
    } else {
      message.error("Product updated failed!");
    }
  }

  return (
    <>
      <Head>
        <title>Product Catalogue Management</title>
      </Head>
      <main className={`flex min-h-screen bg-[#FAF2E3]`}>
        <NaviBar onToggle={() => setToggleMenu(!toggleMenu)} avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
        <div className={`p-[32px]`} style={{ width: 'calc(100% - ' + (!toggleMenu ? '50px' : '300px') + ')' }}>
          <h1 className="font-bold text-2xl mb-[24px]">Product Catalog Management</h1>
          <div className="flex justify-between gap-[12px] mb-[24px]">
            <Input
              placeholder="Search Product by Name / Barcode"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Button
              size='large'
              icon={<ScanOutlined/>}
              style={{ marginLeft: 8 }}
              onClick={() => setScanner(!scanner)}
            >
              Toggle scanner {!scanner ? "on" : "off"}
            </Button>
            <Button
              size='large'
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginLeft: 8 }}
              onClick={() => setAddProductModalVisible(true)} // Open the add product modal
            >
              Add new product
            </Button>
          </div>
          <Table 
            loading={loading} 
            scroll={{ x: "max-content" }} 
            dataSource={products} 
            columns={columns}
            pagination={{
              total: totalPage * 8,
              pageSize: 8,
              onChange: (page) => setPage(page)
            }}
          />
        </div>
        

        {/* Modal for viewing product details */}
        
        <Modal
          title="Update Product"
          open={updateProductModalVisible}
          onOk={handleUpdate}
          onCancel={() => setUpdateProductModalVisible(false)}
        >
          <Form layout='vertical'>
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
          <Form form={addForm} onFinish={handleAdd} layout='vertical'>
            <Form.Item name='name' label="Product Name">
              <Input
                placeholder='Enter product name'
              />
            </Form.Item>
            <Form.Item name='import_price' label="Import Price">
              <Input
                placeholder='Enter import price of product'
              />
            </Form.Item>
            <Form.Item name='retail_price' label="Retail Price">
              <Input
                placeholder='Enter retail price of product'
              />
            </Form.Item>
            <Form.Item name='category' label="Category">
              <Input
                placeholder='Enter product category'
              />
            </Form.Item>
            <Form.Item name='stock_quantity' label="Stock Quantity">
              <Input
                placeholder='Enter product stock quantity'
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Delete Product"
          open={deleteProductModalVisible}
          onOk={handleDelete}
          onCancel={() => setDeleteProductModalVisible(false)}
        >
          <p>Are you sure you want to delete this product?</p>
        </Modal>

        {
          scanner && <BarcodeScanner onDetected={(value) => setSearchTerm(value)} />
        }
      </main>
    </>

  );
};

export default ProductCatalog;

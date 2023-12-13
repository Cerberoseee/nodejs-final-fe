import { Table } from "antd";
import React from "react";

export const PrintComponent = React.forwardRef((props, ref) => {
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      align: "center",
      render: (item) => (
        <span>{item.toLocaleString()} VNĐ</span>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: "center",
    },
    {
      title: 'Amount',
      align: "center",
      render: (_, record) => (
        <span>{(record.retail_price * record.quantity).toLocaleString()} VNĐ</span>
      )
    }
  ];

  return (
    <div className="p-[24px]" ref={ref}>
      <h2 className="text-center">TRANSACTION RECEIPT</h2>

      <div className="flex justify-between mb-[4px] w-full">
        <p>Staff: {props.staff}</p>
        <p>Customer: {props.customer}</p>
      </div>

      <div className="mb-[12px] text-right">
        <p>Issued Time: {new Date().toLocaleString("VN-vi")}</p>
      </div>

      <Table 
        columns={columns}
        dataSource={props.products || []}
        pagination={false}
      />

      <div className="mt-[12px] w-full">
        <div className="flex justify-between">
          <h4>Total Amount</h4>
          <span>{parseFloat(props.totalAmount || 0).toLocaleString()} VNĐ</span>
        </div>

        <div className="flex justify-between">
          <h4>Customer Given</h4>
          <span>{parseFloat(props.customerGiven || 0).toLocaleString()} VNĐ</span>
        </div>

        <div className="flex justify-between">
          <h4>Customer Payback</h4>
          <span>{parseFloat(props.customerPayback || 0).toLocaleString()} VNĐ</span>
        </div>
      </div>
    </div>
  );
});
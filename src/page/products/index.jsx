import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UserOutlined,ProductOutlined  ,EditOutlined ,DeleteOutlined } from '@ant-design/icons';

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm 1', price: 100000 },
    { id: 2, name: 'Sản phẩm 2', price: 200000 },
    // Thêm dữ liệu giả mạo khác nếu cần
  ]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = (value) => {
    setSearchText(value);
    // Perform search logic here and update 'users' state accordingly
  };

  // Function to handle edit
  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
    // Fetch user details based on userId and populate form fields
  };

  // Function to handle delete
  const handleDelete = (userId) => {
    // Perform delete logic here
  };

  const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <span>{text.toLocaleString()} VNĐ</span>,
      },
    {
      title: 'Hành động',
    
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
        <Button><EditOutlined style={{ fontSize: '16px' }} onClick={() => handleEdit(record.id)} /></Button>
        <Button><DeleteOutlined style={{ fontSize: '16px' }} onClick={() => handleDelete(record.id)} /></Button>
      </Space>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form layout="vertical">
        <Form.Item
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Tên sản phẩm
            </span>
          }
        >
          <Input
            style={{
              width: 500,
            }}
          />
        </Form.Item>
      </Form>
      <Table
        pagination={{
          pageSize: 10,
          total: 20,
        }}
        columns={columns}
        dataSource={products}
      />
      <Modal
        title="Edit Post"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => setIsModalVisible(false)}
          >
            Save
          </Button>,
        ]}
      >
        {/* Form fields for editing user */}
      </Modal>
    </div>
  );
};
export default Products;

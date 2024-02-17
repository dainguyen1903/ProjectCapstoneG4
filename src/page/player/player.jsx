import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form, Row, Col } from "antd";
import FormItem from "antd/es/form/FormItem";
import {
  UserOutlined,
  ProductOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
const data = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyen.van.a@example.com",
      nationality: "Viet Nam",
      position: "Tiền đạo",
    },
    {
      id: 1,
      name: "Nguyễn Văn B",
      email: "nguyen.van.a@example.com",
      nationality: "Viet Nam",
      position: "Tiền vệ",
    },
    {
      id: 1,
      name: "Nguyễn Văn C",
      email: "nguyen.van.a@example.com",
      nationality: "Viet Nam",
      position: "Thủ môn",
    },
    {
      id: 1,
      name: "Nguyễn Văn D",
      email: "nguyen.van.a@example.com",
      nationality: "Viet Nam",
      position: "Tiền đạo",
    },
    {
      id: 1,
      name: "Nguyễn Văn E",
      email: "nguyen.van.a@example.com",
      nationality: "Viet Nam",
      position: "Tiền đạo",
    },
    {
      id: 1,
      name: "Nguyễn Văn F",
      email: "nguyen.van.a@example.com",
      nationality: "Viet Nam",
      position: "Tiền đạo",
    },
    {
      id: 1,
      name: "Nguyễn Văn G",
      email: "nguyen.van.a@example.com",
      nationality: "Viet Nam",
      position: "Tiền đạo",
    },
  ]
const ManagePlayer = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState(data);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = (value) => {
    setUsers(data.filter(i => i.name.toUpperCase().includes(value.name.toUpperCase())))
  };

  // Function to handle edit
  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
    // Fetch user details based on userId and populate form fields
  };

  // Function to handle delete
  const handleDelete = (userId) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa cầu thủ",
    });
  };

  // Table columns
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quốc tịch",
      dataIndex: "nationality",
    },
    {
      title: "Vị trí",
      dataIndex: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button>
              <EditOutlined
                style={{ fontSize: "16px" }}
                onClick={() => navigate("/player/edit/" + record.id)}
              />
            </Button>
            <Button>
              <DeleteOutlined
                style={{ fontSize: "16px" }}
                onClick={() => handleDelete(record.id)}
              />
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form onFinish={handleSearch} layout="vertical">
        <Form.Item
        name={"name"}
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Họ tên
            </span>
          }
        >
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Input />
            </Col>
            <Col
              style={{
                marginLeft: 20,
              }}
            >
              <Button htmlType="submit" type="primary">Tìm kiếm</Button>
            </Col>
            <Col>
              <Button onClick={() => navigate("/player/add")}>
                Thêm cầu thủ
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Table
        pagination={{
          pageSize: 10,
          total: 20,
        }}
        columns={columns}
        dataSource={users}
      />
      <Modal
        title="Edit User"
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
export default ManagePlayer;

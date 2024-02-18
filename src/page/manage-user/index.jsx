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
  { id: 1, name: "Nguyễn Văn A", email: "nguyen.van.a@example.com" },
  { id: 2, name: "Trần Thị B", email: "tran.thi.b@example.com" },
  { id: 3, name: "Lê Văn C", email: "le.van.c@example.com" },
  { id: 4, name: "Phạm Thị D", email: "pham.thi.d@example.com" },
  { id: 5, name: "Hoàng Văn E", email: "hoang.van.e@example.com" },
  { id: 6, name: "Huỳnh Thị F", email: "huynh.thi.f@example.com" },
  { id: 7, name: "Phan Văn G", email: "phan.van.g@example.com" },
  { id: 8, name: "Vũ Thị H", email: "vu.thi.h@example.com" },
  { id: 9, name: "Đặng Văn I", email: "dang.van.i@example.com" },
  { id: 10, name: "Bùi Thị K", email: "bui.thi.k@example.com" },
  { id: 11, name: "Đỗ Văn L", email: "do.van.l@example.com" },
  { id: 12, name: "Hồ Thị M", email: "ho.thi.m@example.com" },
  { id: 13, name: "Ngô Văn N", email: "ngo.van.n@example.com" },
  { id: 14, name: "Dương Thị O", email: "duong.thi.o@example.com" },
  { id: 15, name: "Lý Văn P", email: "ly.van.p@example.com" },
  { id: 16, name: "Chu Thị Q", email: "chu.thi.q@example.com" },
  { id: 17, name: "Võ Văn R", email: "vo.van.r@example.com" },
  { id: 18, name: "Kim Thị S", email: "kim.thi.s@example.com" },
  { id: 19, name: "Trịnh Văn T", email: "trinh.van.t@example.com" },
  { id: 20, name: "Hoàng Thị U", email: "hoang.thi.u@example.com" },
]
const ManageUser = () => {
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
      content: "Xóa người dùng",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
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
                onClick={() => navigate("/user/edit/" + record.id)}
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
              <Button className="Button-no-paading" shape="round" htmlType="submit" type="primary">Tìm kiếm</Button>
            </Col>
            <Col>
              <Button shape="round" onClick={() => navigate("/user/add")}>
                Thêm người dùng
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
export default ManageUser;

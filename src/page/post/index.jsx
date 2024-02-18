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
  { id: 1, title: "Bài đăng 1", content: "Nội dung bài đăng 1" },
  { id: 2, title: "Bài đăng 2", content: "Nội dung bài đăng 2" },
  // Thêm dữ liệu giả mạo khác nếu cần
]
const PostManage = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(data);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = (value) => {
    setPosts(data.filter(i => i.title.toUpperCase().includes(value.title.toUpperCase())))

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
      content: "Xóa bài viết",
    });
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button>
              <EditOutlined
                style={{ fontSize: "16px" }}
                onClick={() =>navigate("/news/edit/"+record.id)}
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
        name={"title"}
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Tiêu đề
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
              <Button className="Button-no-paading" htmlType="submit" shape="round">Tìm kiếm</Button>
            </Col>
            <Col>
              <Button shape="round" onClick={() => navigate("/news/add")}>
                Thêm bài viết
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
        dataSource={posts}
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
export default PostManage;

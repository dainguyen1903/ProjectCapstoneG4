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
import { Link } from "react-router-dom";
import useNewsStore from "../../zustand/newsStore";
import { useForm } from "antd/es/form/Form";
const PostManage = () => {
  const news = useNewsStore((state) => state.news);
  const [form] = useForm();
  const removeNews = useNewsStore((state) => state.removeNews);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(news);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = (value) => {
    setPosts(
      news.filter((i) =>
        i.title.toUpperCase().includes(value.title.toUpperCase())
      )
    );
  };

  // Function to handle edit
  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
    // Fetch user details based on userId and populate form fields
  };

  // Function to handle delete
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa bài viết",
      onOk: () => {
        removeNews(id);
        Modal.success({
          title: "Thành công",
          content: "Xóa thành công",
        });
        const txt = form.getFieldValue("title") || "";
        setPosts(
          news
            .filter((i) => i.title.toUpperCase().includes(txt.toUpperCase()))
            .filter((i) => i.id != id)
        );
      },
    });
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (value, row) => (
        <Link to={`/news/detail/` + row.id}>{value}</Link>
      ),
    },
    {
      title: "Loại bài viết",
      dataIndex: "typeNewsValue",
      key: "typeNewsValue",
      render: (value, row) => (
        <span>{value}</span>
      ),
    },

    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button onClick={() => navigate("/news/edit/" + record.id)}>
              <EditOutlined
                style={{ fontSize: "16px" }}
                
              />
            </Button>
            <Button onClick={() => handleDelete(record.id)}>
              <DeleteOutlined
                style={{ fontSize: "16px" }}
                
              />
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form form={form} onFinish={handleSearch} layout="vertical">
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
              <Button
                className="Button-no-paading"
                htmlType="submit"
                shape="round"
              >
                Tìm kiếm
              </Button>
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
          total:posts.length,
          position:["bottomCenter"]
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

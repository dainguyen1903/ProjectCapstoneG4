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
import useCategoryStore from "../../zustand/productCategoryStore";
import useNewsCategoryStore from "../../zustand/newsCategoryStore";
const NewsCategoryList = () => {
  const newsCategories = useNewsCategoryStore(state => state.newsCategories);
  const [form] = useForm();
  const deleteCategory = useNewsCategoryStore((state) => state.deleteNewsCategory);

  const navigate = useNavigate();
  const [posts, setPosts] = useState(newsCategories);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = (value) => {
    setPosts(
        newsCategories.filter((i) =>
        i.name.toUpperCase().includes(value.name.toUpperCase())
      )
    );
  };

  // Function to handle delete
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa danh mục bài viết",
      onOk: () => {
        deleteCategory(id);
        Modal.success({
          title: "Thành công",
          content: "Xóa thành công",
        });
        const txt = form.getFieldValue("name") || "";
        setPosts(
          newsCategories
            .filter((i) => i.name.toUpperCase().includes(txt.toUpperCase()))
            .filter((i) => i.id != id)
        );
      },
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "title",
     
    },
    {
        title: "Tên danh mục bài viết",
        dataIndex: "name",
        key: "title",
        align:"center"
       
      },

    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button onClick={() => navigate("/category-news/edit/" + record.id)}>
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
          name={"name"}
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Tên danh mục bài viết
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
              <Button shape="round" onClick={() => navigate("/category-news/add")}>
                Thêm danh mục bài viết
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
export default NewsCategoryList;

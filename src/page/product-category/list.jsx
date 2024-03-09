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
const ProductCategoryList = () => {
  const categories = useCategoryStore(state => state.categories);
  const [form] = useForm();
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(categories);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = (value) => {
    setPosts(
        categories.filter((i) =>
        i.name.toUpperCase().includes(value.name.toUpperCase())
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
      content: "Xóa danh mục sản phẩm",
      onOk: () => {
        deleteCategory(id);
        Modal.success({
          title: "Thành công",
          content: "Xóa thành công",
        });
        const txt = form.getFieldValue("name") || "";
        setPosts(
          categories
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
        title: "Tên danh mục sản phẩm",
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
            <Button onClick={() => navigate("/category-product/edit/" + record.id)}>
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
              Tên danh mục sản phẩm
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
              <Button shape="round" onClick={() => navigate("/category-product/add")}>
                Thêm danh mục sản phẩm
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
export default ProductCategoryList;

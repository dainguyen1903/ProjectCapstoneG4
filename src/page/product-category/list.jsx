import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, Row, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useCategoryStore from "../../zustand/productCategoryStore";
import { categoryApi } from "../../api/category.api";
const ProductCategoryList = () => {
  const [form] = useForm();

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [categories, setCategoryList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = async (value) => {
    const name = form.getFieldValue("name") || "";
    const res = await categoryApi.searchCategory({search:name});
    if (res.data.status === 200 || res.data.status === 204 ||res.data.status === 204 ) {
      setCategoryList(res.data.data || []);
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  // Function to handle delete
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa danh mục sản phẩm",
      onOk: async () => {
        const res = await categoryApi.deleteCategory(id);
        if (res.data.status === 200 || res.data.status === 204) {
          Modal.success({
            title: "Thành công",
            content: "Xóa thành công",
          });
          handleSearch();
        }
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
      align: "center",
    },

    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button
              onClick={() => navigate("/category-product/edit/" + record.id)}
            >
              <EditOutlined style={{ fontSize: "16px" }} />
            </Button>
            <Button onClick={() => handleDelete(record.id)}>
              <DeleteOutlined style={{ fontSize: "16px" }} />
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card style={{marginBottom:20}}>
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
              <Button
                shape="round"
                onClick={() => navigate("/category-product/add")}
              >
                Thêm danh mục sản phẩm
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      </Card>
     <Card>
     <Table
        pagination={{
          pageSize: 10,
          total: categories.length,
          position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={categories}
      />
     </Card>
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

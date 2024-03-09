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
import useProductStore from "../../zustand/productStore";
const ProductList = () => {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore(state => state.deleteProduct)
  const [form] = useForm();
  const removeNews = useNewsStore((state) => state.removeNews);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [product, setproduct] = useState(products);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = (value) => {
    setproduct(
      products.filter((i) =>
        i.name.toUpperCase().includes(value.name.toUpperCase())
      )
    );
  };


  // Function to handle delete
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa sản phẩm",
      onOk: () => {
        deleteProduct(id);
        Modal.success({
          title: "Thành công",
          content: "Xóa thành công",
        });
        const txt = form.getFieldValue("name") || "";
        setproduct(
          products
            .filter((i) => i.name.toUpperCase().includes(txt.toUpperCase()))
            .filter((i) => i.id != id)
        );
      },
    });
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "img",
      key: "title",
      render:(v,re) => re.image_url ? <img style={{
        width:60,
        height:60,
        objectFit:"contain"
      }} src={re.image_url} /> : <></>
      
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "title",
      
    },
    {
      title: "Tên loại sản phẩm",
      dataIndex: "category_name",
      key: "title",
     
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "title",
     
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "title",
      render:(v) => <span>{v} VND</span>
    },
    {
      title: "Khuyến mãi",
      dataIndex: "discount",
      key: "title",
      render:(v) => <span>{v} %</span>
    },

    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button onClick={() => navigate("/products/edit/" + record.id)}>
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
              Tên sản phẩm
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
              <Button shape="round" onClick={() => navigate("/products/add")}>
                Thêm sản phẩm
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Table
        pagination={{
          pageSize: 10,
          total:product.length,
          position:["bottomCenter"]
        }}
        columns={columns}
        dataSource={product}
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
export default ProductList;

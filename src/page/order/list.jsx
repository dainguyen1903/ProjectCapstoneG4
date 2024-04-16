import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Modal, Form, Row, Col, Card ,DatePicker} from "antd";
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
import { productApi } from "../../api/product.api";
import { showMessErr } from "../../ultis/helper";
import { orrderApi } from "../../api/order.api";
const { RangePicker } = DatePicker;

const OrderList = () => {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore(state => state.deleteProduct)
  const [form] = useForm();
  const removeNews = useNewsStore((state) => state.removeNews);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [product, setproduct] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = async(value) => {
    const name = form.getFieldValue("name") ?form.getFieldValue("name").trim(): "";
   const res  = await productApi.searchProduct({
    productName:name
   });
   if(res.data.status ===200 || res.data.status ===204){
    setproduct(res.data.data || []);
   }
   else{
    setproduct([]);
    showMessErr(res.data)
   }
  };


  // Function to handle delete
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa sản phẩm",
      onOk: async() => {
        const res = await productApi.deleteProduct(id);
        if(res.data.status === 200 || res.data.status === 204){
          Modal.success({
            title: "Thành công",
            content: "Xóa thành công",
          });
          handleSearch();
        }
        else{
          showMessErr(res.data)
        }
      },
    });
  };
// useEffect(() => {
//   handleSearch();
// },[])

/// get list order
const getListOrder = async() => {
    try {
        const res = await orrderApi.getListOrder();
        setproduct(res.data.data || [])
    } catch (error) {
        
    }
}
useEffect(() => {
  getListOrder()
},[])
const columns = [
    {
      title: 'Người đặt',
      dataIndex: ['user', 'firstName'],
      key: 'user',
      render: (_,{user}) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Giá',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
      title: 'Người ship',
      dataIndex: ['shipping', 'name'],
      key: 'shipping',
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
    {
      title: 'Trạng thái ship',
      dataIndex: ['shipping', 'shipStatus'],
      key: 'shipStatus',
    },
  ];

  return (
    <div>
     <Card style={{marginBottom:20}}>
     <Form form={form} onFinish={handleSearch} layout="vertical">
     <Form.Item
        label={<span className="bold">Ngày order</span>}
        name="dateRange"
       
      >
        <Row>
        <Col>
        <RangePicker
          format="YYYY-MM-DD"
          showTime={{ format: 'HH:mm' }}
        />
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
           
          </Row>
        
        
      </Form.Item>

        {/* <Form.Item
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
        </Form.Item> */}
      </Form>
     </Card>
     <Card>
     <Table
        pagination={{
          pageSize: 10,
          total:product.length,
          position:["bottomCenter"]
        }}
        columns={columns}
        dataSource={product}
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
export default OrderList;

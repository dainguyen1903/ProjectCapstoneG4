import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Table,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { orrderApi } from "../../api/order.api";
import { productApi } from "../../api/product.api";
import { STATUS_ORDER } from "../../constants/common";
import { ROLE } from "../../constants/role";
import { dateFormat, showMessErr } from "../../ultis/helper";
import useAuthStore from "../../zustand/authStore";
import useNewsStore from "../../zustand/newsStore";
import useProductStore from "../../zustand/productStore";
const { RangePicker } = DatePicker;

const listStatusOrderOption = [
  { key: "PENDING_CONFIRMATION", value: "Chờ xác nhận" },
  { key: "CONFIRMED", value: "Đã xác nhận" },
  { key: "IN_PROGRESS", value: "Đang giao" },
  { key: "DELIVERED", value: "Đã giao" },
  { key: "FAILED", value: "Giao thất bại" },
  { key: "RETURNED", value: "Đơn hoàn trả" },
  { key: "CANCELLED", value: "Đã hủy" },
];
const OrderList = () => {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const [form] = useForm();
  const removeNews = useNewsStore((state) => state.removeNews);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [product, setproduct] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenModalShipper, setIsOpenModalShipper] = useState(false);
  const [listShipperDistric, setListShipperDistrict] = useState([]);
  const { user } = useAuthStore();
  const isShipper = user.authority === ROLE.SHIPPER;
  const [currentIdShipper,setCurrentIdShipper] = useState(null);
  const [currentShippingId,setCurrentShippingId] = useState(null)
  const [originIdShipper,setOriginIdShipper] = useState(null);

  

  // Function to handle search
  const handleSearch = async (value) => {
    const name = form.getFieldValue("name")
      ? form.getFieldValue("name").trim()
      : "";
    const res = await productApi.searchProduct({
      productName: name,
    });
    if (res.data.status === 200 || res.data.status === 204) {
      setproduct(res.data.data || []);
    } else {
      setproduct([]);
      showMessErr(res.data);
    }
  };

  // Function to handle delete
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa sản phẩm",
      onOk: async () => {
        const res = await productApi.deleteProduct(id);
        if (res.data.status === 200 || res.data.status === 204) {
          Modal.success({
            title: "Thành công",
            content: "Xóa thành công",
          });
          handleSearch();
        } else {
          showMessErr(res.data);
        }
      },
    });
  };

  // get list Shipper district
  const getListShipperDistric = async (idShipping) => {
    setIsOpenModalShipper(true);
    try {
      const res = await orrderApi.getListShipperDistrict(idShipping);
      if (res.data.status === 200 || res.data.status === 204) {
        setListShipperDistrict(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   handleSearch();
  // },[])

  /// get list order
  const getListOrder = async () => {
    try {
      const res = isShipper
        ? await orrderApi.getListOrderByShipper()
        : await orrderApi.getListOrder();
      setproduct(res.data.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    getListOrder();
  }, []);

  // CHange Status
  const handleChangeStatus = async (id, v) => {
    try {
      await orrderApi.changStatusOrder(id, v);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Người đặt",
      dataIndex: ["user", "firstName"],
      key: "user",
      render: (_, { user,id }) => <span onClick={() => navigate("/order-detail/"+id)} style={{
        cursor:"pointer",

      }}>
        {user.firstName} {user.lastName}
      </span>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (row, value) => <span>{dateFormat(value.orderDate)}</span>,
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) =>
        totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Người ship",
      dataIndex: "shipping",
      render: (row, value) => {
        console.log(row);
        console.log(value);

        return (
          <div>
            <span>
              {row.shipperName
                ? row?.shipperName?.firstName + " " + row?.shipperName?.lastName
                : ""}
            </span>
            {!isShipper && (
              <EditOutlined
                style={{
                  marginLeft: 10,
                }}
                onClick={() => {
                  setCurrentIdShipper(row?.shipperName?.id);
                  setCurrentShippingId(value?.shipping?.id)
                  setOriginIdShipper(row?.shipperName?.id)
                  getListShipperDistric(row?.id);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (row, value) => {
        return (
          <div>
            {isShipper ? (
              <Select
                onChange={(v) => handleChangeStatus(value.id, v)}
                value={value.orderStatus}
              >
                {listStatusOrderOption.map((i) => (
                  <Select.Option value={i.key}>{i.value}</Select.Option>
                ))}
              </Select>
            ) : (
              <span>{STATUS_ORDER[value.orderStatus]}</span>
            )}
          </div>
        );
      },
    },
  ];

  const closeModal = () => {
    setIsOpenModalShipper(false);
    setCurrentIdShipper(null);
    setCurrentShippingId(null)
  }

  return (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <Form form={form} onFinish={handleSearch} layout="vertical">
          <Form.Item
            label={<span className="bold">Ngày đặt</span>}
            name="dateRange"
          >
            <Row>
              <Col>
                <RangePicker
                  format="YYYY-MM-DD"
                  showTime={{ format: "HH:mm" }}
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
        </Form>
      </Card>
      <Card>
        <Table
          pagination={{
            pageSize: 10,
            total: product.length,
            position: ["bottomCenter"],
          }}
          columns={columns}
          dataSource={product}
        />
      </Card>

      <Modal
        title="Chọn shipper"
        open={isOpenModalShipper}
        onCancel={() => closeModal(false)}
        centered={true}
        footer={[]}
      >
        <Select 
          value={currentIdShipper}
          onChange={(v) => setCurrentIdShipper(v) }
          style={{
            width: 400,
          }}
        >
          {listShipperDistric.map((item) => (
            <Select.Option value={item.id}>
              {item.firstName + " " + item.lastName}
            </Select.Option>
          ))}
        </Select>

        <Button
          style={{ background: "rgb(31, 167, 167)", marginLeft: 10 }}
          type="primary"
          onClick={async() => {
            if(currentIdShipper === originIdShipper){
              closeModal()
              return;
            }
           const res =   await orrderApi.assignShipper(currentShippingId,currentIdShipper);
           if(res.data.status === 200 || res.data.status === 204){
            message.success("Assign thành công");
            closeModal();
           }
           if(res.data.status === 400){
            const mes  = res?.data.message || "Thất bại"
            message.error(mes);
           }
          }}
        >
          Lưu
        </Button>
      </Modal>
    </div>
  );
};
export default OrderList;

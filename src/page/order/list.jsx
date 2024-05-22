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
import {
  dateFormat,
  dateFormat2,
  handleError,
  showMessErr,
  showMessErr400,
} from "../../ultis/helper";
import useAuthStore from "../../zustand/authStore";
import useNewsStore from "../../zustand/newsStore";
import useProductStore from "../../zustand/productStore";
const { RangePicker } = DatePicker;

const listStatusOrderOption = [
  { key: "IN_PROGRESS", value: "Đang giao" },
  { key: "DELIVERED", value: "Đã giao" },
];
const listStatusOrderOptionFull = [
  { key: "PENDING_CONFIRMATION", value: "Chờ xác nhận" },
  { key: "CONFIRMED", value: "Đã xác nhận" },
  { key: "IN_PROGRESS", value: "Đang giao" },
  { key: "DELIVERED", value: "Đã giao" },
  { key: "FAILED", value: "Giao thất bại" },
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
  const [currentIdShipper, setCurrentIdShipper] = useState(null);
  const [currentShippingId, setCurrentShippingId] = useState(null);
  const [originIdShipper, setOriginIdShipper] = useState(null);
  const [listOriginOrder, setListOrginOrder] = useState([]);
  const [dates, setDates] = useState(null);

  // Function to handle search
  const handleSearch = async () => {
    if(!dates){
      setproduct(listOriginOrder);
      return;
    }
   const [startDate,endDate] = dates;
   setproduct(listOriginOrder.filter(order => {
    const orderDate = new Date(dateFormat2(order.orderDate));
    return orderDate >= startDate && orderDate<=endDate
   }))
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

  /// get list order
  const getListOrder = async () => {
    try {
      const res = isShipper
        ? await orrderApi.getListOrderByShipper()
        : await orrderApi.getListOrder();
      setproduct(res?.data?.data || []);
      setListOrginOrder(res?.data?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    getListOrder();
  }, []);

  // CHange Status
  const handleChangeStatus = async (id, v) => {
    try {
      const res = await orrderApi.changStatusOrder(id, v);
      if (res?.data?.status === 200 || res?.data?.status === 204) {
        message.success(
          `Đã chuyển trạng thái đơn hàng thành ${
            listStatusOrderOptionFull.find((i) => i.key === v)?.value
          }`
        );
        getListOrder();
      } else {
        showMessErr400(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Người đặt",
      dataIndex: ["user", "firstName"],
      key: "user",
      render: (_, { user, id }) => (
        <span
          onClick={() => navigate("/order-detail/" + id)}
          style={{
            cursor: "pointer",
          }}
        >
          {user?.firstName} {user?.lastName}
        </span>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (row, value) => <span>{dateFormat(value?.orderDate)}</span>,
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) =>
        totalPrice?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Người ship",
      dataIndex: "shipping",
      render: (row, value) => {
        return (
          <div>
            <span>
              {row?.shipperName
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
                  setCurrentShippingId(value?.shipping?.id);
                  setOriginIdShipper(row?.shipperName?.id);
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
        const isOption = listStatusOrderOption.find(
          (i) => i.key === value?.orderStatus
        );
        return (
          <div>
            {isShipper ? (
              <Select
                style={{ width: "200px" }}
                onChange={(v) => handleChangeStatus(value.id, v)}
                value={isOption ? value?.orderStatus : ""}
              >
                <Select.Option style={{ display: "none" }} disabled value={""}>
                  {
                    listStatusOrderOptionFull?.find(
                      (i) => i.key === value?.orderStatus
                    )?.value
                  }
                </Select.Option>
                {listStatusOrderOption.map((i) => (
                  <Select.Option value={i.key}>{i.value}</Select.Option>
                ))}
              </Select>
            ) : (
              <span>{STATUS_ORDER[value?.orderStatus]}</span>
            )}
          </div>
        );
      },
    },
  ];
  if (user.authority === ROLE.SALE) {
    columns.push({
      title: "Xác nhận đơn hàng",
      render: (value, row) => {
        return row?.orderStatus === STATUS_ORDER.pending ? (
          <div>
            <Button
              onClick={async () => {
                try {
                  const res = await orrderApi.confirmOrder(row?.id);
                  if (res?.data?.status === 200 || res?.data?.status === 204) {
                    message.success("Đã xác nhận đơn hàng");
                    getListOrder();
                  } else {
                    message.error("Có lỗi xảy ra");
                  }
                } catch (error) {
                  message.error("Có lỗi xảy ra");
                }
              }}
            >
              Xác nhận
            </Button>
          </div>
        ) : (
          <></>
        );
      },
    });
  }

  const closeModal = () => {
    setIsOpenModalShipper(false);
    setCurrentIdShipper(null);
    setCurrentShippingId(null);
  };

  const onChange = (dates, dateStrings) => {
    console.log("Selected Time: ", dates);
    console.log("Formatted Selected Time: ", dateStrings);
    setDates(dates);
  };
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
                  value={dates}
                  onChange={onChange}
                  format="YYYY-MM-DD"
                  // showTime={{ format: "HH:mm" }}
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
          onChange={(v) => setCurrentIdShipper(v)}
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
        <div
          style={{
            marginBlock: 5,
            color: "gray",
          }}
        >
          {listShipperDistric.length === 0
            ? "Không có shipper nào phù hợp"
            : ""}
        </div>
        <Button
          disabled={!listShipperDistric.length}
          style={{
            background: "rgb(31, 167, 167)",
            marginLeft: 10,
            color: "white",
          }}
          type="primary"
          onClick={async () => {
            if (currentIdShipper === originIdShipper) {
              closeModal();
              return;
            }
            try {
              const res = await orrderApi.assignShipper(
                currentShippingId,
                currentIdShipper
              );
              if (res.data.status === 200 || res.data.status === 204) {
                message.success("Assign thành công");
                getListOrder();
                closeModal();
              }
              if (res.data.status === 400) {
                const mes = res?.data.message || "Thất bại";
                message.error(mes);
              }
            } catch (error) {
              handleError(error);
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

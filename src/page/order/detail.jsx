import React, { useEffect, useState } from "react";
import { orrderApi } from "../../api/order.api";
import "./order.scss";
import OrderItem from "./orderItem";
import { dateFormat3 } from "../../ultis/helper";
import { useParams } from "react-router";

const OrderDetail = () => {
  const [orderItemFake, setOrderItem] = useState({});
  const { id } = useParams();
  const getOrderDetail = async () => {
    try {
      const res = await orrderApi.getOrderDetailById(id);
      if(res?.data?.status === 200 || res?.data?.status === 204 ){
        setOrderItem(res?.data?.data || {})
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrderDetail();
  }, []);
  return (
    <div
      className="cart bg-whitesmoke"
      style={{
        padding: "20px 0",
      }}
    >
      <div style={{
        paddingBottom:15
      }} className="order-item">
        <div style={{color:"black"}} className="bold">Thông tin nhận hàng</div>
        <p style={{ color: "gray" }}>{orderItemFake?.shipping?.shipName}</p>
        <p style={{ color: "gray" }}>{orderItemFake?.shipping?.phone}</p>
        <p style={{ color: "gray" }}>
          {orderItemFake?.shipping?.address +
            ", " +
            orderItemFake?.shipping?.ward +
            " - " +
            orderItemFake?.shipping?.district +
            " - " +
            orderItemFake?.shipping?.province}
        </p>
        <p style={{ color: "gray" }}>{"Note : " +  orderItemFake?.shipping?.note}</p>
      </div>
      <OrderItem item={orderItemFake} />
      <div style={{
        paddingBottom:15
      }} className="order-item">
        <div style={{color:"black"}} className="bold">Phương thức thanh toán</div>
        <p style={{ color: "gray" }}>
          {orderItemFake?.paymentMethod === "COD"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán VNPAY"}
        </p>
      </div>
      <div style={{
        paddingBottom:15
      }} className="order-item">
        <div style={{color:"black"}} className="bold">
          <span
            style={{
              display: "inline-block",
              width: 150,
            }}
          >
            Mã đơn hàng :
          </span>{" "}
          {orderItemFake?.orderCode}
        </div>
        <p style={{ color: "gray" }}>
          <span
            style={{
              display: "inline-block",
              width: 150,
            }}
          >
            Thời gian đặt hàng :
          </span>{" "}
          <span>{dateFormat3(orderItemFake.orderDate)}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;

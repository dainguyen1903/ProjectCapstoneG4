import React from "react";

import "./order.scss";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../ultis/helper";
import { STATUS_ORDER } from "../../constants/common";
const ProductItem = ({ productItem }) => {
  console.log(productItem)
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: 15,
          borderBottom: "1px solid lightgray",
          position:"relative",
          color:"black",
          alignItems:"center"
        }}
      >
        <div>
          <img
            src={
              productItem?.product?.imagesProductList?.length > 0
                ? productItem?.product?.imagesProductList[0]?.path
                : ""
            }
            style={{
              width: 100,
              height: 100,
              marginRight: 10,
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{}}>
          <p
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {productItem?.product?.productName}
          </p>
          <p>Phân loại hàng : Size {productItem.size}</p>
          <p>Phân loại hàng : x{productItem?.quantity}</p>
        </div>
        <div
          style={{
            textAlign: "end",
            padding: "20px 0",
            fontSize: 14,
            fontWeight: "bold",
            position:"absolute",
            bottom:-15,
            right:10
          }}
        >
          <span
            style={{
              color: "rgb(41, 174, 189)",
            }}
          >
            {" "}
            {formatPrice(productItem?.unitPrice * productItem?.quantity)}
          </span>
        </div>
      </div>
    </>
  );
};
const OrderItem = ({ item }) => {
  const navigate = useNavigate();
  const listProduct = item?.orderDetailDtoList || [];
  return (
    <div
      onClick={() => navigate("/order-detail/" + item.id)}
      className="order-item"
    >
      <div
        style={{
          textAlign: "end",
          textTransform: "uppercase",
          borderBottom: "1px solid lightgray",
          color: "rgb(41, 174, 189)",
        }}
      >
        {STATUS_ORDER[item.orderStatus]}
      </div>
      <div>
        {listProduct.map((pro) => (
          <ProductItem productItem={pro} />
        ))}
      </div>
      <div
        style={{
          textAlign: "end",
          padding: "20px 0",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Tổng tiền :{" "}
        <span
          style={{
            color: "rgb(41, 174, 189)",
          }}
        >
          {" "}
          {formatPrice(item.totalPrice)}
        </span>
      </div>
    </div>
  );
};

export default OrderItem;

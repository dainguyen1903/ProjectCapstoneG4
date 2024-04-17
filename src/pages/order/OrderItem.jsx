import React from "react";

import { STATUS_ORDER } from "../../constants/common";
import "./order.scss";
import { format } from "date-fns";
import { formatPrice } from "../../utils/helpers";
const OrderItem = ({ item }) => {
  return (
    <div className=" order-item">
      <div
        style={{
          textAlign: "end",
          textTransform: "uppercase",
          borderBottom: "1px solid lightgray",
          color:"rgb(41, 174, 189)"
        }}
      >
        {STATUS_ORDER[item.orderStatus]}
      </div>
      <div style={{
            display:"flex",
            padding:15,
            borderBottom: "1px solid lightgray",
            
            
        }}>
        <div >
          <img
            src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lpqsxk765yyf04_tn"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{
          
        }}>
          <p style={{
            fontSize:18,
            fontWeight:"bold",
            
          }}>
            Hoodie ,Áo Nỉ Cao Cấp Chat Xem Shop ĐÃ HỦY Áo Sweater Loewe , Áo Nỉ
            Dài Tay Cổ Tròn Chất Nỉ Bông Kiểu Dáng Unisex Cao Cấp
          </p>
          <p>Phân loại hàng : Size M</p>
          <p>Phân loại hàng : x1</p>
        </div>
      </div>
      <div style={{
        textAlign:"end",
        padding:"20px 0",
        fontSize:20,
        fontWeight:"bold"
      }}>
       Thành tiền : <span  style={{
        color:"rgb(41, 174, 189)"
       }}> {formatPrice(item.totalPrice)}</span>
      </div>
    </div>
  );
};

export default OrderItem;

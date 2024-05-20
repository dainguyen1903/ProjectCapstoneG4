import React from "react";

import { STATUS_ORDER } from "../../constants/common";
import "./order.scss";
import { format } from "date-fns";
import { formatPrice, handleError } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal, message } from "antd";
import { orrderApi } from "../../api/order.api";
const ProductItem = ({ productItem }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: 15,
          borderBottom: "1px solid lightgray",
          position:"relative"
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

const OrderItem = ({ item ,getList}) => {
  const location = useLocation()
  const navigate = useNavigate();
  const listProduct = item?.orderDetailDtoList || [];
  const handleCancel  = (e) => {
    e.stopPropagation()
    Modal.confirm({
      title: "Xác nhận",
      content: "Xác nhận hủy đơn hàng",
      onOk: async () => {
        try {
          const res = await orrderApi.cancelOder(item.orderId)
          if(res?.data?.status === 200 ||res?.data?.status === 204 ){
            message.success("Đã hủy đơn hàng")
            getList()
          }
        } catch (error) {
          message.error("Thất bại")
        }
      },
      centered:true
  
    })
  }
  return (
    <div
      onClick={() => navigate("/order-detail/" + item.orderId)}
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
      {/* <div style={{
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
      </div> */}
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
   {(item.orderStatus === STATUS_ORDER.pending ||item.orderStatus === STATUS_ORDER.confirmed ) && location.pathname === "/order" &&    <div style={{
        display:"flex",
        justifyContent:"flex-end",
        paddingBottom:10
      }}>
        <Button onClick={handleCancel}>Hủy đơn</Button>
      </div>}
    </div>
  );
};

export default OrderItem;

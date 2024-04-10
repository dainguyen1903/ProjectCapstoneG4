import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Col, Modal, Row, Tag } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { STATUS_MATCH } from "../../constants/common";
import { addCartTicketAction } from "../../store/cartTicketSlice";
import { formatPrice } from "../../utils/helpers";
import "./../CartPage/CartPage.scss";

const getStatusColor = (status) => {
  switch (status) {
    case "0":
      return "green"; // Chưa Bắt Đầu
    case "1":
      return "orange"; // Đang Diễn Ra
    case "2":
      return "red"; // Đã Kết Thúc
    default:
      return "black"; // Mặc định
  }
};
const TicketItem = ({
  homeTeam,
  awayTeam,
  giaiDau,
  ngay,
  gio,
  homeScore,
  awayScore,
  statusMatch,
  isMatch,
  numberOfTicket,
  priceOfTicket,
  numberOfTicketsSold,
  id
}) => {
  const MODE = {
    ADD_CART: 1,
    BUY: "0",
  };
  const [quantity, setQuantity] = useState(1);
  const dispatch =  useDispatch()

  const content = (
    <div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
         style={{
          display: "inline-block",
          width:100,
        }}
          className="bold"
        >
          Giá vé :{" "}
        </span>
        {formatPrice(priceOfTicket)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          
        }}
      >
        <span style={{
            display: "inline-block",
            width:100,
          }} className="bold">Só lượng : </span>
        <div >
          <Button disabled={quantity === 1} onClick={() => setQuantity(quantity-1)} style={{ marginRight: 5 }} size="small">
            <i className="fas fa-minus"></i>
          </Button>

          {quantity}
          <Button onClick={()=> setQuantity(quantity+1)} style={{ marginLeft: 5 }} size="small">
            <i className="fas fa-plus"></i>
          </Button>
        </div>
      </div>
      <div
        style={{
          marginTop: 10,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width:100,
          }}
          className="bold"
        >
          Tổng cộng:{" "}
        </span>
        {formatPrice(priceOfTicket * quantity)}
      </div>
    </div>
  );
  const [mode, setMode] = useState();
  const openModal = () => {};
  const onClose = () => {
    setMode(null);
    setQuantity(1)
  }

  const onSave  = async () => {
    try {
      
      const result = await dispatch(
        addCartTicketAction({
          id,quantity
        })
      );

      const originResult = unwrapResult(result);
      Modal.success({
        title:"Thành công",
        content:"Đã thêm vé vào giỏ hàng",
        centered:true,
        onOk:() => onClose()
      })
    } catch (error) {
      const mess  = typeof(error) === "string" ? error :""
      Modal.error({
        title:"Error",
        content:mess ||"Error",
        centered:true
      })
    }
  }
  return (
    <>
      <Card
        style={{
          padding: 10,
          marginBottom: 20,
          borderLeft: "5px solid rgb(41, 174, 189)",
        }}
      >
        <Row>
          <Col span={6}>
            <div className="bold">{ngay}</div>
            <div>{giaiDau}</div>
            <div>
              <img
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "contain",
                }}
                src={
                  "https://th.bing.com/th/id/OIP.Ow2t20e6N5SgB6rCm9a3kgHaEl?rs=1&pid=ImgDetMain"
                }
              />
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            span={12}
          >
            <div className="ticket-club">{homeTeam}</div>
            <div className="ticket-time">
              {isMatch && statusMatch !== STATUS_MATCH.PENDING
                ? `${homeScore || 0} - ${awayScore || 0}`
                : gio}
            </div>
            <div className="ticket-club">{awayTeam}</div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            span={6}
          >
            {isMatch ? (
              <Tag color={getStatusColor(statusMatch)}>
                {STATUS_MATCH[statusMatch]}
              </Tag>
            ) : (
              <div style={{ marginTop: 20 }}>
                <div>
                  <Button
                    onClick={() => {
                      setMode(MODE.BUY);
                      openModal();
                    }}
                    style={{
                      background: "rgb(41, 174, 189)",
                      color: "#fff",
                    }}
                  >
                    Mua ngay
                  </Button>
                  <Button
                    onClick={() => {
                      setMode(MODE.ADD_CART);
                      openModal();
                    }}
                    style={{
                      background: "#fff",
                      color: "black",
                      marginLeft: 10,
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <div
                  style={{
                    textAlign: "end",
                    marginTop: 10,
                    color: "gray",
                  }}
                >
                  Còn {numberOfTicket - numberOfTicketsSold} vé
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Card>
      <Modal
        centered={true}
        title={mode === MODE.ADD_CART ? "Thêm giỏ hàng" : "Mua ngay"}
        open={mode}
        onOk={() => onSave()}
        onCancel={() => {
          onClose()
        }}
      >
        {content}
      </Modal>
    </>
  );
};

export default TicketItem;

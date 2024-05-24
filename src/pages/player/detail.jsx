import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncProducts } from "../../store/productSlice";
import { Avatar, Card, Col, Row } from "antd";
import "./player.scss";
import { playerApi } from "../../api/player.api";

const PlayerDetail = ({}) => {
  const [data, setData] = useState({});
  const listInfo = [
    {
      title: "Ngày sinh",
      value: "12/05/1997",
    },
    {
      title: "Địa chỉ",
      value: "Can lộc - Hà tĩnh",
    },
    {
      title: "Quốc tịch",
      value: "Việt Nam",
    },
    {
      title: "Vị trí",
      value: "Tiền đạo",
    },
    {
      title: "Ngày gia nhập",
      value: "12/05/1997",
    },
  ];
  return (
    <div className="product-lists  my-3 container">
      <div className="">
        <Row
          gutter={[16, 16]}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
            borderBottom:" 1px solid rgb(232, 226, 226)",
            padding:30
          }}
        >
          <Col>
            <Avatar
              style={{ width: 200, height: 200, border: "1px solid lightgray" }}
              src={
                "https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
              }
            />
          </Col>
          <Col>
            <p
              className="info-value"
              style={{
                color: "rgb(41, 174, 189)",
                fontSize: 35,
              }}
            >
              Hoàng Văn Thành
            </p>
          </Col>
        </Row>
        <Row style={{ background: "white" }} gutter={[16, 16]}>
          <Col span={12}>
            <p
              className="info-value"
              style={{
                color: "rgb(41, 174, 189)",
              }}
            >
              Tiểu sử cầu thủ
            </p>
            <p>báhdbsabdsjs</p>
          </Col>
          <Col span={12}>
            <p
              className="info-value"
              style={{
                color: "rgb(41, 174, 189)",
              }}
            >
              Thông tin
            </p>
            <div>
              {listInfo.map((item) => (
                <div className="wrap-info">
                  <p className="info-title">{item.title}</p>
                  <p className="info-value">{item.value}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PlayerDetail;

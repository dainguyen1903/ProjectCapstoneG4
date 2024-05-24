import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncProducts } from "../../store/productSlice";
import { Avatar, Card, Col, Row } from "antd";
import "./player.scss";
import { playerApi } from "../../api/player.api";
import { useParams } from "react-router-dom";
import { dateFormat } from "../../utils/helpers";

const PlayerDetail = ({}) => {
  const [data, setData] = useState({});
  const {id} = useParams();
  const getDetail = async () => {
    try {
        const res = await playerApi.getDetailPlayer(id)
        if(res?.data?.status === 200 ||res?.data?.status === 204 ){
            setData(res?.data?.data)
        }
    } catch (error) {
        
    }
  }
  useEffect(() => {
   getDetail()
  },[id])
  const listInfo = [
    
    {
      title: "Ngày sinh",
      value: dateFormat(data?.dateOfBirth),
    },
    
    {
      title: "Quốc tịch",
      value: data?.nationality,
    },
    {
      title: "Vị trí",
      value: data.position,
    },
    {
        title: "Số áo",
        value: data.playerNumber,
      },
    {
      title: "Ngày gia nhập",
      value: dateFormat(data?.joinDate),
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
               data?.imageAvatar
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
             {data?.name}
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
            <p>{data?.bio}</p>
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

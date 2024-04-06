import { Button, Card, Col, Row, Tag } from "antd";
import React from "react";
import { STATUS_MATCH } from "../../constants/common";
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
}) => {
  return (
    <Card
      style={{
        padding: 10,
        marginBottom: 10,
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
            {(isMatch &&statusMatch !== STATUS_MATCH.PENDING)
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
            <Button
              style={{
                background: "rgb(41, 174, 189)",
                color: "#fff",
              }}
            >
              Mua vé
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default TicketItem;

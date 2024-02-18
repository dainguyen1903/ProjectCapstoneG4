import { Avatar, Card, Col, Row } from "antd";

const DetailPlayer = () => {
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col offset={6} span={8}>
          <Card  className="Shadow">
            <div
              style={{
                textAlign: "center",
                marginBottom: 70,
              }}
            >
              <Avatar size={120}>T</Avatar>
              <h2>Nguyen Van A</h2>
            </div>
          <div style={{
           
          }}> 
          <div
              style={{
                marginBottom: 10,
              
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày sinh : </span>
              <span>12-05-2001</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Quốc tịch : </span>
              <span>Việt Nam</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Vị trí : </span>
              <span>Tiền đạo</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Chiều cao : </span>
              <span>180 cm</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Cân nặng : </span>
              <span>80 kg</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày gia nhập : </span>
              <span> 12-09-2023</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Tiểu sử :</span>
              <span>Tiểu sử cầu thủ</span>
            </div>
          </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default DetailPlayer;

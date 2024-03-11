import { Avatar, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePlayerStore from "../../zustand/playerStore";
import LoadingFull from "../../component/loading/loadingFull";
import moment from "moment"
const DetailPlayer = () => {
  const {id} = useParams();
  const [detaiData,setDetailData] = useState({})
  const [loading,setLoading] = useState(false)
  const players = usePlayerStore((state) => state.players);
  const detail = players.find(i => i.id == id) || {}


  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
       setDetailData(detail)
        resolve();
      }, 1000);
    }).then(() => {
      setLoading(false);
    });
  },[id])
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
              <Avatar src={detaiData.image_url} size={120}>{ detaiData.name&& detaiData.name[0]}</Avatar>
              <h2>{detaiData.name}</h2>
            </div>
          <div style={{
           
          }}> 
          <div
              style={{
                marginBottom: 10,
              
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày sinh : </span>
              <span>{moment(detaiData.date_of_birth).format('YYYY-MM-DD')}</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Quốc tịch : </span>
              <span>{detaiData.nationality}</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Vị trí : </span>
              <span>{detaiData.position}</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Chiều cao : </span>
              <span>{detaiData.height} cm</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Cân nặng : </span>
              <span>{detaiData.weight} kg</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày gia nhập : </span>
              <span> { moment(detaiData.join_date).format('YYYY-MM-DD')}</span>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Tiểu sử : </span>
              <span>{detaiData.bio}</span>
            </div>
          </div>
          </Card>
        </Col>
      </Row>
      <LoadingFull show={loading} />
    </div>
  );
};
export default DetailPlayer;

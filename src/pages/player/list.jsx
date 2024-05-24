import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncProducts } from "../../store/productSlice";
import { Card, Col, Row } from "antd";
import "./player.scss";
import { playerApi } from "../../api/player.api";
import { useNavigate } from "react-router-dom";

const PlayerListList = ({}) => {
  const navigate = useNavigate()
  const [listPlayer, setListPlayer] = useState([]);
  const getList = async () => {
    try {
      const res = await playerApi.getListPlayer();
      if (res?.data?.status === 200 || res?.data?.status === 204) {
        setListPlayer(res?.data?.data || []);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="product-lists  bg-whitesmoke my-3 container">
      <div className="">
        <div style={{ width: "100%" }} className="title-md">
          <h3>Danh sách cầu thủ</h3>
        </div>
        {listPlayer.length === 0 && (
          <div
            style={{
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "gray",
            }}
          >
            Chưa có cầu thủ nào
          </div>
        )}
        <Row style={{ marginTop: 30 }} gutter={[16, 16]}>
          {listPlayer.map((item) => (
            <Col span={4}>
              <Card onClick={() =>navigate("/player/detail/1") } style={{ marginBottom: 30 }} className="card-player">
                <div className="wrap-image-player">
                  <img
                    className="image-player"
                    src={
                      "https://www.mancity.com/meta/media/ejhjw1j4/scott-carson.png?width=376&quality=100"
                    }
                  />
                </div>
                <p className="player-name">Hoang Van Thanh</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PlayerListList;

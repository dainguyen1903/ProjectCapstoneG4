import { Row, Col } from "antd";
import "./match.scss";
import { useEffect, useState } from "react";
const NextMatchPoster = ({
  nameClub1,
  nameClub2,
  logo1,
  logo2,
  date,
  name,
  tournamentName,
  time,
  location
}) => {
  const [show, shetShow] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      shetShow(currentShow => currentShow === 1 ? 2 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Row
      gutter={[16, 16]}
      style={{
        width: "100%",
      }}
      className="nextMatchPoster"
    >
      <Col
        style={{
          display: "flex",
        }}
        span={8}
      >
        <img
          style={{
            height: "200px",
          }}
          src={logo1}
        />
        <img
          style={{
            height: "200px",
          }}
          src={logo2}
        />
      </Col>
      <Col className="infoNextMatch" span={16}>
       
        {show === 1 && <p className="txtMatch">{tournamentName}</p>}
        {show === 2 && (
          <p className="txtStadium">{location} | {date} | {time}</p>
        )}
      </Col>
    </Row>
  );
};
export default NextMatchPoster;

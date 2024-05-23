import { Avatar, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import usePlayerStore from "../../zustand/playerStore";
import LoadingFull from "../../component/loading/loadingFull";
import moment from "moment";
import useAuthStore from "../../zustand/authStore";
import { ROLE } from "../../constants/role";
import { userApi } from "../../api/user.api";
const ViewProfile = () => {
  const { id } = useParams();
  const [detaiData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.authority === "Admin";
  const navigate = useNavigate();
  const getDetailProfie = async () => {
    setLoading(true);
    const res = await userApi.getProfileUser();
    const detail = res.data.data;
    detail.name = detail.firstName + " " + detail.lastName;
    setDetailData(detail);
    setLoading(false);
  };
  useEffect(() => {
    getDetailProfie();
  }, []);
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col offset={2} span={20}>
          <div
            style={{
              background: "white",
              color: "black",
              padding: 30,
              borderRadius: 5,
            }}
            className=""
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: 70,
              }}
            >
              <Avatar src={detaiData.image} size={120}>
                {detaiData.name && detaiData.name[0]}
              </Avatar>
              <h2>{detaiData.name}</h2>
            </div>
            <div style={{}}>
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Email : </span>
                <span>{detaiData.email}</span>
              </div>
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Tỉnh/Thành phố : </span>
                <span>{detaiData.province}</span>
              </div>
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Quận/Huyện : </span>
                <span>{detaiData.district}</span>
              </div>
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Phường/Xã : </span>
                <span>{detaiData.ward}</span>
              </div>
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Địa chỉ : </span>
                <span>{detaiData.address}</span>
              </div>
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Ngày sinh : </span>
                <span>
                  {detaiData.dateOfBirth
                    ? moment(detaiData.dateOfBirth).format("YYYY-MM-DD")
                    : ""}
                </span>
              </div>
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Giới tính: </span>
                <span>{detaiData.gender === "M" ? "Nam" : "Nữ"}</span>
              </div>
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                {/* <span style={{ fontWeight: "bold" }}>Quyền : </span>
                <span>{ROLE[detaiData.role]}</span> */}
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={() => navigate("/profile/edit")}
                className="Button"
              >
                Chỉnh sửa thông tin cá nhân
              </button>
            )}
          </div>
        </Col>
      </Row>
      <LoadingFull show={loading} />
    </div>
  );
};
export default ViewProfile;

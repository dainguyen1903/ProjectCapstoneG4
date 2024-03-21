import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import "./Profile.scss";
import moment from "moment";
import { userApi } from "../../api/user.api";
const { Option } = Select;
const ProfileUser = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const isEditProfile = location.pathname.includes("profile");
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSave = async () => {
    setLoading(true)
    const objPost = form.getFieldsValue();
    const date = form.getFieldValue("dateOfBirth");
    const dateString = date ? moment(date).format("YYYY-MM-DD"):null;
    objPost.dateOfBirth = dateString;
    objPost.image = url;
    const res = await userApi.udpateProfileUser(objPost);
    setLoading(false)
  };

  // getDetail
  const getDetail = async () => {
    setLoading(true);

    const res = await userApi.getProfileUser();
    const dataDetail = res.data.data;

    dataDetail.dateOfBirth = dataDetail.dateOfBirth
      ? moment(dataDetail.dateOfBirth)
      : null;
    setUrl(isEditProfile ? dataDetail.image : dataDetail.imageUrl);
    delete dataDetail.image_name;
    setUrl(dataDetail.image);
    form.setFieldsValue(dataDetail);
    setLoading(false);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Row
      className="main-content bg-whitesmoke bg-white"
      style={{
        padding: 20,
        background: "white",
      }}
      gutter={[32, 32]}
    >
      <Col style={{}} span={8} offset={6}>
        <div>
          <h2 style={{ marginBottom: 10 }}>
            {isEditProfile
              ? "Chỉnh sửa thông tin cá nhân"
              : !id
              ? "Thêm người dùng"
              : "Cập nhật người dùng"}
          </h2>
          <Form
            style={{
              width: "100%",
            }}
            form={form}
            layout="vertical"
          >
            <Form.Item label={<span className="bold">Email</span>} name="email">
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              style={{
                marginTop: -15,
              }}
              label={<span className="bold">Họ và tên đệm</span>}
              name="firstName"
            >
              <Input placeholder="Họ và tên đệm" />
            </Form.Item>
            <Form.Item
              style={{
                marginTop: -15,
              }}
              label={<span className="bold">Tên</span>}
              name="lastName"
            >
              <Input placeholder="Tên" />
            </Form.Item>
            <Form.Item
              style={{
                marginTop: -15,
              }}
              label={<span className="bold">Địa chỉ</span>}
              name="address"
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              style={{
                marginTop: -15,
              }}
              label={<span className="bold">Ngày sinh</span>}
              name="dateOfBirth"
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              style={{
                marginTop: -15,
              }}
              label={<span className="bold">Giới tính</span>}
              name="gender"
            >
              <Select placeholder="Giới tính" className="Select">
                <Option value="M">Nam</Option>
                <Option value="F">Nữ</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                style={{
                  marginTop: 20,
                  background: "rgb(41, 174, 189",
                }}
                disabled={loading}
                onClick={() => onSave()}
                htmlType="submit"
                type="primary"
              >
                {loading && (
                  <Spin
                    size="small"
                    style={{
                      marginRight: 5,
                    }}
                  />
                )}
                Lưu
              </Button>
            </Form.Item>
          </Form>
          {/* <LoadingFull show={loading} /> */}
        </div>
      </Col>

      <Col style={{ width: "100%", marginTop: 50 }} span={6}>
        <input
          onChange={handleChangeFile}
          ref={fileRef}
          type="file"
          style={{
            display: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 50,
          }}
          onClick={() => {
            fileRef.current.click();
          }}
          // className="proImage"
        >
          <Avatar size={150} src={url}></Avatar>
          <Button style={{marginTop:10}}>+ Thêm ảnh</Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileUser;

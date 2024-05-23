import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Modal,
  Card,
  Row,
  Col,
} from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router";
import "./../login/login.css";
import useUserStore from "../../zustand/userStore";
import moment from "moment";
import LoadingFull from "../../component/loading/loadingFull";
import useAuthStore from "../../zustand/authStore";
import { userApi } from "../../api/user.api";
import AddImage from "../../component/common/AddImage";
import { handleError, showMessErr400 } from "../../ultis/helper";
import Province from "../../component/common/Province";
const { Option } = Select;

const AddUserForm = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const isEditProfile = location.pathname.includes("profile");
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [imageName, setImageName] = useState("");
  const fileRef = useRef();
  const updateUsers = useUserStore((state) => state.updateuser);
  const addUser = useUserStore((state) => state.adduser);
  const [loading, setLoading] = useState(false);
  const users = useUserStore((state) => state.users);
  const user = useAuthStore((state) => state.user);
  const setuser =  useAuthStore((state) => state.setuser);
  const setUser = useAuthStore((state) => state.setUser);
  const [file, setFile] = useState(null);
  let detail = isEditProfile ? user : users.find((i) => i.id == id) || {};
  const navigate = useNavigate();
  const [role,setRole] = useState("")
  const [dataProvince, setDataProvince] = useState({
    province: "",
    district: "",
    ward: "",
  });
  const [email,setEmail] = useState("")
  // Confirm save
  const confirmSave = (value) => {
    console.log(value)
    Modal.confirm({
      title: "Xác nhận",
      content: isEditProfile
        ? "Chỉnh sửa thông tin cá nhân"
        : !id
        ? "Thêm người dùng"
        : "Cập nhật người dùng",
      onOk: async () => {
        try {
          let res;
          const dataPosst = JSON.parse(JSON.stringify(value));
          const birdday = dataPosst.dateOfBirth;
          dataPosst.dateOfBirth = birdday
            ? moment(birdday).format("YYYY-MM-DD")
            : null;
          dataPosst.image_name = imageName;
          dataPosst.image = url;
          dataPosst.province = dataProvince.province;
          dataPosst.district = dataProvince.district;
          dataPosst.ward = dataProvince.ward;
          if (isEditProfile) {
            res = await userApi.udpateProfileUser(dataPosst);
            setUser({
              ...user,
              ...dataPosst,
              fullname: dataPosst.firstName + "" + dataPosst.lastName,
            });
          } else if (id) {
            delete dataPosst.image;
            dataPosst.authority = dataPosst.role;
            delete dataPosst.role;
            delete dataPosst.image_name;
            dataPosst.imageUrl = url
            res = await userApi.updateUser(dataPosst,id);
          } else {
            delete dataPosst.image;
            dataPosst.authority = dataPosst.role;
            delete dataPosst.role;
            delete dataPosst.image_name;
            dataPosst.imageUrl = url
            res = await userApi.createrUser(dataPosst);
          }
          if (res?.data?.status === 200 || res?.data?.status === 204) {
            Modal.success({
              title: "Thành công",
              content:
                !id && !isEditProfile
                  ? "Thêm thành công"
                  : "Cập nhật thành công",
            });
            
              form.resetFields();
              if(isEditProfile){
                console.log(dataPosst)
                setUser({...user,...dataPosst})
              }
              navigate(-1)
            
          } else {
            showMessErr400(res);
          }
        } catch (error) {
          handleError(error);
        }
      },
    });
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    setFile(file);
    let reader = new FileReader();
    reader.onloadend = function () {
      setImageName(file.name);
      setUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // getDetail
  const getDetail = async () => {
    setLoading(true);
    if (id || isEditProfile) {
      const res = isEditProfile
        ? await userApi.getProfileUser()
        : await userApi.detailUser({
            id,
          });

      const dataDetail = res.data.data;
      if (id) {
        const fullname = dataDetail?.firstName + " " +  dataDetail?.lastName
        const nameArr = fullname?.split(" ");
        dataDetail.firstName = nameArr[0];
        dataDetail.lastName = nameArr[1];
      }
      const imgName = detail.image_name;
      setImageName(imgName);
      dataDetail.dateOfBirth = dataDetail.dateOfBirth
        ? moment(dataDetail.dateOfBirth)
        : null;
      dataDetail.role = dataDetail.authority;
      setUrl(isEditProfile ? dataDetail.image : dataDetail.imageUrl);

      dataDetail.image = imgName;
      delete dataDetail.image_name;
      console.log(dataDetail);
      setDataProvince({
        province:dataDetail.province,
        district:dataDetail.district,
        ward:dataDetail.ward
      })
      form.setFieldsValue(dataDetail);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDetail();
  }, [id]);

  useEffect(() => {
 if(dataProvince.province !== "Tỉnh Hà Tĩnh"){
  if(role === "Shipper"){
    setDataProvince({
      ...dataProvince,
      province:"Tỉnh Hà Tĩnh",
      district:"",
      ward:""
    })
  }
 }
  },[role])
  return (
    <Card>
      <div>
        <h2 style={{ marginBottom: 10 }}>
          {isEditProfile
            ? "Chỉnh sửa thông tin cá nhân"
            : !id
            ? "Thêm người dùng"
            : "Cập nhật người dùng"}
        </h2>

        <Row>
          <Col span={12}>
            <Form
              form={form}
              wrapperCol={{ span: 24 }}
              onFinish={confirmSave}
              layout="vertical"
            >
              <div className="inputLabel">Email</div>
              <Form.Item
                
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input disabled={id || isEditProfile} placeholder="Email" className="Input" />
              </Form.Item>
              <div className="inputLabel">Họ và tên đệm</div>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên đệm!" },
                ]}
              >
                <Input placeholder="Họ và tên đệm" className="Input" />
              </Form.Item>
              <div className="inputLabel">Tên</div>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input placeholder="Tên" className="Input" />
              </Form.Item>
              <Province
                state={dataProvince}
                setStateData={setDataProvince}
                bold
                width={"100%"}
                disabledProvince={role === "Shipper"}
              />
              <div className="inputLabel">Địa chỉ</div>
              <Form.Item name="address">
                <Input placeholder="Địa chỉ" className="Input" />
              </Form.Item>
              <div className="inputLabel">Ngày sinh</div>
              <Form.Item name="dateOfBirth">
                <DatePicker inputReadOnly placeholder="Ngày sinh" className="Input" />
              </Form.Item>
              <div style={{ marginBottom: 10 }}>
                <div style={{ marginBottom: 5 }} className="inputLabel">
                  Giới tính
                </div>
                <Form.Item name="gender">
                  <Select placeholder="Giới tính" className="Select">
                    <Option value="M">Nam</Option>
                    <Option value="F">Nữ</Option>
                  </Select>
                </Form.Item>
              </div>

              {!isEditProfile && (
                <>
                  <div
                    style={{
                      marginBottom: 5,
                    }}
                    className="inputLabel"
                  >
                    Quyền
                  </div>
                  <Form.Item
                    name="role"
                    rules={[
                      { required: true, message: "Vui lòng chọn quyền!" },
                    ]}
                  >
                    <Select value={role} onChange={(e) => setRole(e)} placeholder="Quyền" className="Select">
                      <Option value="Operator">Operator</Option>
                      <Option value="Sale">Sale </Option>
                      <Option value="Shipper">Shipper </Option>
                    </Select>
                  </Form.Item>
                </>
              )}
              <Form.Item>
                <button
                  style={{
                    marginTop: 15,
                  }}
                  className="Button"
                  htmlType="submit"
                  type="primary"
                >
                  {isEditProfile
                    ? "Cập nhật thông tin cá nhân"
                    : id
                    ? "Cập nhật"
                    : "Tạo mới"}
                </button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <input
              type="file"
              style={{
                display: "none",
              }}
              ref={fileRef}
              onChange={handleChangeFile}
            />
            <AddImage url={url} click={() => fileRef.current.click()} />
          </Col>
        </Row>
        {/* <LoadingFull show={loading} /> */}
      </div>
    </Card>
  );
};

export default AddUserForm;

import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useLocation, useParams } from "react-router";
import "./../login/login.css";
import useUserStore from "../../zustand/userStore";
import moment from "moment";
import LoadingFull from "../../component/loading/loadingFull";
import useAuthStore from "../../zustand/authStore";
import { userApi } from "../../api/user.api";
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
  const setUser = useAuthStore((state) => state.setUser);
  const [file,setFile] = useState(null);
  let detail = isEditProfile ? user : users.find((i) => i.id == id) || {};

  // Confirm save
  const confirmSave = (value) => {
    Modal.confirm({
      title: "Xác nhận",
      content: isEditProfile
        ? "Chỉnh sửa thông tin cá nhân"
        : !id
        ? "Thêm người dùng"
        : "Cập nhật người dùng",
      onOk: async () => {
        const dataPosst = JSON.parse(JSON.stringify(value));
        const birdday = dataPosst.dateOfBirth;
        dataPosst.dateOfBirth = birdday
          ? moment(birdday).format("YYYY-MM-DD")
          : null;
        dataPosst.image_name = imageName;
        dataPosst.image = url;
        if (isEditProfile) {
          await userApi.udpateProfileUser(dataPosst);
          setUser({
            ...user,
            ...dataPosst,
            fullname: dataPosst.firstName + "" + dataPosst.lastName,
          });
        } else if (id) {
          console.log(dataPosst)
          delete dataPosst.image
          dataPosst.authority  = dataPosst.role
          delete dataPosst.role;
          delete dataPosst.image_name
          const formData = new FormData()
          for (let key in dataPosst) {
            if (dataPosst.hasOwnProperty(key)) {
              formData.append(key, dataPosst[key]);
            }
          }
          formData.append("file",file)
          
         await userApi.updateUser(formData)
        } else {
          delete dataPosst.image
          dataPosst.authority  = dataPosst.role
          delete dataPosst.role;
          delete dataPosst.image_name
          const formData = new FormData()
          for (let key in dataPosst) {
            if (dataPosst.hasOwnProperty(key)) {
              formData.append(key, dataPosst[key]);
            }
          }
          formData.append("file",file)
          await userApi.createrUser(formData)
        }
        Modal.success({
          title: "Thành công",
          content:
            !id && !isEditProfile ? "Thêm thành công" : "Cập nhật thành công",
        });
        if (!id && !isEditProfile) {
          form.resetFields();
        }
      },
    });
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    setFile(file)
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
      const res = isEditProfile ? await userApi.getProfileUser() : await userApi.detailUser({
        id
      });
      
      const dataDetail = res.data.data;
      if(id){
        const nameArr = dataDetail.fullname.split(" ");
        dataDetail.firstName = nameArr[0];
        dataDetail.lastName = nameArr[1];
      }
      const imgName = detail.image_name;
      setImageName(imgName);
      dataDetail.dateOfBirth = dataDetail.dateOfBirth
        ? moment(detail.dateOfBirth)
        : null;
        dataDetail.role = dataDetail.authority
      setUrl(isEditProfile ? dataDetail.image :dataDetail.imageUrl );
      dataDetail.image = imgName;
      delete dataDetail.image_name;
      console.log(dataDetail);
      form.setFieldsValue(dataDetail);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDetail();
  }, [id]);
  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {isEditProfile
          ? "Chỉnh sửa thông tin cá nhân"
          : !id
          ? "Thêm người dùng"
          : "Cập nhật người dùng"}
      </h2>
      <Form
        form={form}
        wrapperCol={{ span: 8 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input placeholder="Email" className="Input" />
        </Form.Item>
        {!isEditProfile && !id && (
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password!" }]}
          >
            <Input.Password placeholder="Password" className="Input" />
          </Form.Item>
        )}
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên đệm!" }]}
        >
          <Input placeholder="Họ và tên đệm" className="Input" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input placeholder="Tên" className="Input" />
        </Form.Item>
        <Form.Item name="address">
          <Input placeholder="Địa chỉ" className="Input" />
        </Form.Item>
        <Form.Item name="dateOfBirth">
          <DatePicker placeholder="Ngày sinh" className="Input" />
        </Form.Item>
        <Form.Item name="gender">
          <Select placeholder="Giới tính" className="Select">
            <Option value="M">Nam</Option>
            <Option value="F">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item name="image">
          <Button
            onClick={() => fileRef.current.click()}
            style={{
              marginBottom: 10,
              marginRight: 10,
              marginTop: 10,
            }}
          >
            Thêm Ảnh
          </Button>{" "}
          {imageName && <span>{imageName}</span>}
          <div>
          {url && <img style={{width:70,height:70,objectFit:"contain"}} src={url} />}
          </div>
          <div
            className="flex-start"
            style={{
              alignItems: "center",
            }}
          ></div>
          <input
            style={{
              display: "none",
            }}
            ref={fileRef}
            onChange={handleChangeFile}
            placeholder="Ảnh"
            type="file"
            className="Input"
          />
        </Form.Item>
        {!isEditProfile && (
          <Form.Item
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
          >
            <Select placeholder="Quyền" className="Select">
              <Option value="Admin">Admin</Option>
              <Option value="Operator">Operator</Option>
              <Option value="Sale">Sale </Option>
            </Select>
          </Form.Item>
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
      {/* <LoadingFull show={loading} /> */}
    </div>
  );
};

export default AddUserForm;
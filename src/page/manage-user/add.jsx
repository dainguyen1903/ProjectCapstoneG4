import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useLocation, useParams } from "react-router";
import "./../login/login.css";
import useUserStore from "../../zustand/userStore";
import moment from "moment"
import LoadingFull from "../../component/loading/loadingFull";
import useAuthStore from "../../zustand/authStore";
const { Option } = Select;

const AddUserForm = () => {
  const [form] = Form.useForm();
  const location = useLocation()
  const isEditProfile = location.pathname.includes("profile")
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [imageName, setImageName] = useState("");
  const fileRef = useRef();
  const updateUsers = useUserStore((state) => state.updateuser);
  const addUser = useUserStore((state) => state.adduser);
  const [loading,setLoading] = useState(false)
  const users = useUserStore((state) => state.users);
  const user = useAuthStore(state => state.user)
  let detail = isEditProfile ? user : (users.find(i => i.id == id) || {})

  console.log(detail)
  // Confirm save
  const confirmSave = (value) => {
    Modal.confirm({
      title: "Xác nhận",
      content: isEditProfile ? "Chỉnh sửa thông tin cá nhân" :!id ? "Thêm người dùng" : "Cập nhật người dùng",
      onOk: () => {
        const dataPosst = JSON.parse(JSON.stringify(value));
        const birdday = dataPosst.date_of_birth;
        dataPosst.date_of_birth =  moment(birdday).format('YYYY-MM-DD');
        dataPosst.image_name = imageName;
        dataPosst.image_url = url;

        setTimeout(() => {
          if (id || isEditProfile) {
            updateUsers(id || user.id, dataPosst,isEditProfile);
          } else {
            addUser(dataPosst);
          }
          Modal.success({
            title: "Thành công",
            content: (!id &&!isEditProfile) ? "Thêm thành công" : "Cập nhật thành công",
          });
          if (!id && !isEditProfile) {
            form.resetFields();
          }
        }, 1000);
      },
    });
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    const tempUrl = URL.createObjectURL(file);
    setImageName(file.name);
    setUrl(tempUrl);
  };
  useEffect(() => {
    if (id || isEditProfile) {
      setLoading(true);
      new Promise((resolve) => {
        const dataDetail = JSON.parse(JSON.stringify(detail))
        const imgName = detail.image_name
       setImageName(imgName)
        dataDetail.date_of_birth = moment(dataDetail.date_of_birth)
        setUrl(dataDetail.image_url);
        dataDetail.image_url = imgName;
        delete dataDetail.image_name;
        setTimeout(() => {
          form.setFieldsValue(dataDetail);
          resolve();
        }, 1000);
      }).then(() => {
        setLoading(false);
      });
    }
  }, [id]);
  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {isEditProfile ? "Chỉnh sửa thông tin cá nhân" :!id ? "Thêm người dùng" : "Cập nhật người dùng"}
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
      {!isEditProfile &&   <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập password!" }]}
        >
          <Input.Password placeholder="Password" className="Input" />
        </Form.Item>}
        <Form.Item
          name="first_name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên đệm!" }]}
        >
          <Input placeholder="Họ và tên đệm" className="Input" />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input placeholder="Tên" className="Input" />
        </Form.Item>
        <Form.Item name="address">
          <Input placeholder="Địa chỉ" className="Input" />
        </Form.Item>
        <Form.Item name="date_of_birth">
          <DatePicker placeholder="Ngày sinh" className="Input" />
        </Form.Item>
        <Form.Item name="gender">
          <Select placeholder="Giới tính" className="Select">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item name="image_url">
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
        {!isEditProfile && <Form.Item
          name="role_id"
          rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
        >
          <Select placeholder="Quyền" className="Select">
            <Option value="1">Admin</Option>
            <Option value="2">Staff</Option>
            <Option value="3">Markter </Option>
          </Select>
        </Form.Item>}
        <Form.Item>
          <button
            style={{
              marginTop: 15,
            }}
            className="Button"
            htmlType="submit"
            type="primary"
          >
            {isEditProfile ? "Cập nhật thông tin cá nhân": id ? "Cập nhật" : "Tạo mới"}
          </button>
        </Form.Item>
      </Form>
      <LoadingFull show={loading} />
    </div>
  );
};

export default AddUserForm;

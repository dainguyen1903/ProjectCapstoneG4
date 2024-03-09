import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useLocation, useParams } from "react-router";
import "./../login/login.css";
import useUserStore from "../../zustand/userStore";
import moment from "moment";
import LoadingFull from "../../component/loading/loadingFull";
import useAuthStore from "../../zustand/authStore";
import useCategoryStore from "../../zustand/productCategoryStore";
import useProductStore from "../../zustand/productStore";
const { Option } = Select;

const AddProduct = () => {
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
  const products = useProductStore((state) => state.products);
  let detail =  products.find((i) => i.id == id) || {};
  const categories = useCategoryStore((state) => state.categories);
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  // Confirm save
  const confirmSave = (value) => {
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm sản phẩm" : "Cập nhật sản phẩm",
      onOk: () => {
        const dataPosst = JSON.parse(JSON.stringify(value));
        const category = categories.find(i => i.id == dataPosst.category_id);
        dataPosst.image_name = imageName;
        dataPosst.image_url = url;
        dataPosst.category_name = category ? category.name : "";
        setTimeout(() => {
          if (id) {
            updateProduct(id, dataPosst, isEditProfile);
          } else {
            addProduct(dataPosst);
          }
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
          });
          if (!id) {
            form.resetFields();
          }
        }, 1000);
      },
    });
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
      setImageName(file.name);
      setUrl(reader.result);
    }
    reader.readAsDataURL(file);
  }
  useEffect(() => {
    if (id) {
      setLoading(true);
      new Promise((resolve) => {
        const dataDetail = JSON.parse(JSON.stringify(detail));
        const imgName = detail.image_name;
        setImageName(imgName);
        dataDetail.date_of_birth = moment(dataDetail.date_of_birth);
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
        {!id ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
      </h2>
      <Form
        form={form}
        wrapperCol={{ span: 8 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input placeholder="Tên sản phẩm" className="Input" />
        </Form.Item>
        {
          <Form.Item
            name="category_id"
            rules={[
              { required: true, message: "Vui lòng chọn loại sản phẩm!" },
            ]}
          >
            <Select placeholder="Loại sản phẩm" className="Select">
              {categories.map((i) => (
                <Option value={i.id}>{i.name}</Option>
              ))}
            </Select>
          </Form.Item>
        }
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <Input placeholder="Giá" className="Input" />
        </Form.Item>
        <Form.Item
          name="discount"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số phần trăm khuyến mãi!",
            },
          ]}
        >
          <Input placeholder="Khuyến mãi" className="Input" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}
          name="size"
        >
          <Input placeholder="Kích cỡ" className="Input" />
        </Form.Item>
        <Form.Item name="description">
          <Input placeholder="Mô tả sản phẩm" className="Input" />
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
          <div>
          {url && <img style={{
            width:60,
            height:60,
            objectFit:"contain"
          }} src={url} />}
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

        <Form.Item>
          <button
            style={{
              marginTop: 15,
            }}
            className="Button"
            htmlType="submit"
            type="primary"
          >
            {id ? "Cập nhật" : "Tạo mới"}
          </button>
        </Form.Item>
      </Form>
      <img src={""}/>
      <LoadingFull show={loading} />
    </div>
  );
};

export default AddProduct;

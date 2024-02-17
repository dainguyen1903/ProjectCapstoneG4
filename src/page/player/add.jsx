import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
const { Option } = Select;

const AddPlayerForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Gửi dữ liệu đến backend để xử lý tạo mới người dùng
  };

  // Confirm save
  const confirmSave = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm cầu thủ" : "Cập nhật cầu thủ",
    });
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {!id ? "Thêm cầu thủ" : "Cập nhật cầu thủ"}
      </h2>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <Form.Item
         
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên cầu thủ!" },
          ]}
        >
          <Input className="Input"  placeholder="Tên cầu thủ" />
        </Form.Item>
        <Form.Item
          
          name="date_of_birth"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ngày sinh cầu thủ!",
            },
          ]}
        >
          <DatePicker placeholder="Ngày sinh" className="Input" />
        </Form.Item>
        <Form.Item
        
          name="height"
          rules={[
            { required: true, message: "Vui lòng nhập chiều cao!" },
          ]}
        >
          <Input   placeholder="Chiều cao (cm)" type="number" className="Input" />
        </Form.Item>
        <Form.Item
        
          name="weight"
          rules={[
            { required: true, message: "Vui lòng nhập cân nặng!" },
          ]}
        >
          <Input placeholder="Cân nặng (kg)" type="number" className="Input" />
        </Form.Item>
        <Form.Item
          
          name="nationality"
          rules={[
            { required: true, message: "Vui lòng nhập quốc tịch" },
          ]}
        >
          <Input placeholder="Quốc tịch" className="Input" />
        </Form.Item>
        <Form.Item
          
          name="position"
          rules={[
            { required: true, message: "Vui lòng nhập vị trí!" },
          ]}
        >
          <Input placeholder="Vị trí" className="Input" />
        </Form.Item>
        <Form.Item  name="bio">
          <Input.TextArea placeholder="Tiểu sử" className="Input"/>
        </Form.Item>
        <Form.Item
         
          name="join_date"
          rules={[
            { required: true, message: "Vui lòng nhập ngày gia nhập!" },
          ]}
        >
          <DatePicker  placeholder="Ngày gia nhập" className="Input" />
        </Form.Item>

        <Form.Item  name="image_url">
          <Input placeholder="Ảnh" type="file" className="Input" />
        </Form.Item>
        <Form.Item>
          <button className="Button" htmlType="submit" type="primary">
            {id ? "Cập nhật" : "Tạo mới"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPlayerForm;

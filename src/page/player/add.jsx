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
          label="Tên cầu thủ"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên cầu thủ!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="date_of_birth"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ngày sinh cầu thủ!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Chiều cao (cm)"
          name="height"
          rules={[
            { required: true, message: "Vui lòng nhập chiều cao!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Cân nặng (kg)"
          name="weight"
          rules={[
            { required: true, message: "Vui lòng nhập cân nặng!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Quốc tịch"
          name="nationality"
          rules={[
            { required: true, message: "Vui lòng nhập quốc tịch" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Vị trí"
          name="position"
          rules={[
            { required: true, message: "Vui lòng nhập vị trí!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tiểu sử" name="bio">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Ngày gia nhập"
          name="join_date"
          rules={[
            { required: true, message: "Vui lòng nhập ngày gia nhập!" },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label="Ảnh" name="image_url">
          <Input type="file" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            {id ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPlayerForm;

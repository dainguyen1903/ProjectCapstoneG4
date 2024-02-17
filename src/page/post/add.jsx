import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
const { Option } = Select;

const AddNewsForm = () => {
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
      content: !id ? "Thêm bài viết" : "Cập nhật bài viết",
    });
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {!id ? "Thêm bài viết" : "Cập nhật bài viết"}
      </h2>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <Form.Item
        
          name="title"
          rules={[
            { required: true, message: "Vui lòng nhập tên tiêu đề bài viết!" },
          ]}
        >
          <Input placeholder="Tên tiêu đề" className="Input" />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập mô tả bài viết!" }]}
          
          name="description"
        >
          <Input.TextArea placeholder="Mô tả" className="Input" />
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

export default AddNewsForm;

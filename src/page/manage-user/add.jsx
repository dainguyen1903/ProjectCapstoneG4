import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import {FileImageOutlined} from '@ant-design/icons';
import { useParams } from 'react-router';
const { Option } = Select;

const AddUserForm = () => {
  const [form] = Form.useForm();
  const {id} = useParams()
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Gửi dữ liệu đến backend để xử lý tạo mới người dùng
  };

  // Confirm save
  const confirmSave = () => {
    Modal.confirm({
        title:"Xác nhận",
        content:!id ?"Thêm người dùng" :"Cập nhật người dùng"
        
    })
  }

  return (
   <div>
    <h2 style={{marginBottom:10}}>{!id ?"Thêm người dùng" :"Cập nhật người dùng"}</h2>
     <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      onFinish={confirmSave}
      layout='vertical'
      
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Họ và tên đệm"
        name="first_name"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên đệm!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="last_name"
        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày sinh" name="date_of_birth">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Giới tính" name="gender">
        <Select>
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Ảnh" name="image_url">
        <Input type='file' />
      </Form.Item>
      <Form.Item label="Quyền"  name="role_id"   rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}>
        <Select>
          <Option value="1">Admin</Option>
          <Option value="2">Staff</Option>
          <Option value="3">Markter </Option>
        </Select>
      </Form.Item>
      <Form.Item >
        <Button htmlType='submit'  type="primary">
          {id ? "Cập nhật":"Tạo mới"}
        </Button>
      </Form.Item>
    </Form>
   </div>
  );
};

export default AddUserForm;
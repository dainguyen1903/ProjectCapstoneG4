import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import {FileImageOutlined} from '@ant-design/icons';
import { useParams } from 'react-router';
import "./../login/login.css"
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
     
      wrapperCol={{ span: 8 }}
      onFinish={confirmSave}
      layout='vertical'
      
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input placeholder='Email' className='Input' />
      </Form.Item>
      <Form.Item
       
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
      >
        <Input.Password placeholder='Password' className='Input' />
      </Form.Item>
      <Form.Item
        name="first_name"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên đệm!' }]}
      >
        <Input placeholder='Họ và tên đệm' className='Input' />
      </Form.Item>
      <Form.Item
       
        name="last_name"
        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
      >
        <Input  placeholder="Tên" className='Input' />
      </Form.Item>
      <Form.Item  name="address">
        <Input placeholder="Địa chỉ" className='Input' />
      </Form.Item>
      <Form.Item name="date_of_birth">
        <DatePicker placeholder="Ngày sinh" className='Input' />
      </Form.Item>
      <Form.Item  name="gender">
        <Select placeholder="Giới tính" className='Select'>
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
        </Select>
      </Form.Item>
      <Form.Item  name="image_url" >
        <Input type='file' placeholder='Ảnh' className='Input' />
      </Form.Item>
      <Form.Item   name="role_id"   rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}>
        <Select placeholder="Quyền" className='Select'>
          <Option value="1">Admin</Option>
          <Option value="2">Staff</Option>
          <Option value="3">Markter </Option>
        </Select>
      </Form.Item>
      <Form.Item >
        <button style={{
            marginTop:15
        }} className='Button' htmlType='submit'  type="primary">
          {id ? "Cập nhật":"Tạo mới"}
        </button>
      </Form.Item>
    </Form>
   </div>
  );
};

export default AddUserForm;
import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form, Row, Col } from "antd";
import FormItem from "antd/es/form/FormItem";
import {
  UserOutlined,
  ProductOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import useuserStore from "../../zustand/userStore";
import { useForm } from "antd/es/form/Form";
import useUserStore from "../../zustand/userStore";
import { ROLE } from "../../constants/role";

const ManageUser = () => {
  const [form] = useForm();
  const listusers = useuserStore((state) => state.users);
  const navigate = useNavigate();
  const [users, setUsers] = useState(listusers);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const removeuser = useUserStore((state) => state.removeuser);

  // Function to handle search
  const handleSearch = (value) => {
    setUsers(
      listusers.filter((i) =>{
        const name = i.first_name + i.last_name
      return name.toUpperCase().includes(form.getFieldValue('name').toUpperCase())}
      )
    );
  };

  // Function to handle edit
  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
    // Fetch user details based on userId and populate form fields
  };

  // Function to handle delete
  const handleDelete = (userId) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa người dùng",
      onOk: () => {
        removeuser(userId);
        setUsers(
          listusers.filter((i) =>{
            const name = i.first_name + i.last_name
          return name.toUpperCase().includes(form.getFieldValue('name').toUpperCase())}
          )
        );
        Modal.success({
          title: "Thành công",
          content: "Xóa thành công",
        });
      },
    });
  };
  // Table columns
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      render: (_, row) => (
        <span>
          {row.first_name} {row.last_name}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Quyền",
      dataIndex: "email",
     render:(_,row) => {
      return ROLE[row.role_id]
     }
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button onClick={() => navigate("/user/edit/" + record.id)}>
              <EditOutlined style={{ fontSize: "16px" }} />
            </Button>
            <Button onClick={() => handleDelete(record.id)}>
              <DeleteOutlined style={{ fontSize: "16px" }} />
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Form.Item
          name={"name"}
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Họ tên
            </span>
          }
        >
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Input />
            </Col>
            <Col
              style={{
                marginLeft: 20,
              }}
            >
              <Button
                className="Button-no-paading"
                shape="round"
                htmlType="submit"
                type="primary"
              >
                Tìm kiếm
              </Button>
            </Col>
            <Col>
              <Button shape="round" onClick={() => navigate("/user/add")}>
                Thêm người dùng
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Table
        pagination={{
          pageSize: 10,
          total: 20,
        }}
        columns={columns}
        dataSource={users}
      />
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => setIsModalVisible(false)}
          >
            Save
          </Button>,
        ]}
      >
        {/* Form fields for editing user */}
      </Modal>
    </div>
  );
};
export default ManageUser;

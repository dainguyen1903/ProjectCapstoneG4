import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Modal, Form, Row, Col, Card } from "antd";
import FormItem from "antd/es/form/FormItem";
import {
  UserOutlined,
  ProductOutlined,
  EditOutlined,
  DeleteOutlined,
  UnlockOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import useuserStore from "../../zustand/userStore";
import { useForm } from "antd/es/form/Form";
import useUserStore from "../../zustand/userStore";
import { ROLE } from "../../constants/role";
import { userApi } from "../../api/user.api";

const ManageUser = () => {
  const [form] = useForm();
  const listusers = useuserStore((state) => state.users);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const removeuser = useUserStore((state) => state.removeuser);
  // Function to handle search
  const handleSearch = async({name}) => {
    const res = await userApi.getListuser({name :name|| ""});
    setUsers(
      res?.data?.data?.reverse()|| []
    );
  };

  // Function to handle delete
  const handleDelete = (userId) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Khóa người dùng",
      onOk: async() => {
        await userApi.deleteUser({
          id:userId
        })
        handleSearch({name:form.getFieldValue("name")})
        Modal.success({
          title: "Thành công",
          content: "Khóa thành công",
        });
      },
    });
  };
  
  // Function to handle unlock acc
  const handleUnlock = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Mở khóa tài khoản",
      onOk: async() => {
        await userApi.updateDeleteUser(id)
        handleSearch({name:form.getFieldValue("name")})
        Modal.success({
          title: "Thành công",
          content: "Mở khóa thành công",
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
         {row.fullname}
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
      return row.authority
     }
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
       
        record?.authority !=="Admin" && <Space size="middle">
        <Space size="middle">
          <Button onClick={() => navigate("/user/edit/" + record.id)}>
            <EditOutlined style={{ fontSize: "16px" }} />
          </Button>
          <Button onClick={() => handleDelete(record.id)}>
            <DeleteOutlined style={{ fontSize: "16px" }} />
          </Button>
          {record?.deleteFlg ==="1" &&<Button onClick={() => handleUnlock(record.id)}>
            <UnlockOutlined style={{ fontSize: "16px",color:"green" }} />
          </Button>}
          
        </Space>
      </Space>
       
      ),
    },
  ];
useEffect(() => {

handleSearch({name:""})
},[])
  return (
    <div>
      <Card style={{marginBottom:20}}>
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
      </Card>
     <Card>
     <Table
        pagination={{
          pageSize: 10,
          total:users.length,
          position:["bottomCenter"]
         
        }}
        columns={columns}
        dataSource={users}
      />
     </Card>
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

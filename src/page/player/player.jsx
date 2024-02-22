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
import { Link } from "react-router-dom";
import usePlayerStore from "../../zustand/playerStore";
import { useForm } from "antd/es/form/Form";

const ManagePlayer = () => {
  const [form] = useForm()
  const players = usePlayerStore((state) => state.players);
  console.log(players)
  const [loading,setLoading] = useState(false)
  const removePlayer = usePlayerStore((state) => state.removePlayer);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState(players);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
   

  // Function to handle search
  const handleSearch = (value) => {
    setUsers(
      players.filter((i) =>
        i.name.toUpperCase().includes(form.getFieldsValue.name.toUpperCase())
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
      content: "Xóa cầu thủ",
      onOk: () => {
        removePlayer(userId);
        setUsers(
          players.filter((i) =>
            i.name.toUpperCase().includes(form.getFieldsValue.name.toUpperCase())
          ).filter(i => i.id != userId)
        )
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
      key: "name",
      render: (value, row) => (
        <Link to={`/player/detail/` + row.id}>{value}</Link>
      ),
    },
    {
      title: "Quốc tịch",
      dataIndex: "nationality",
    },
    {
      title: "Vị trí",
      dataIndex: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button onClick={() => navigate("/player/edit/" + record.id)}>
              <EditOutlined
                style={{ fontSize: "16px" }}
              />
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
                htmlType="submit"
                shape="round"
              >
                Tìm kiếm
              </Button>
            </Col>
            <Col>
              <Button shape="round" onClick={() => navigate("/player/add")}>
                Thêm cầu thủ
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
export default ManagePlayer;

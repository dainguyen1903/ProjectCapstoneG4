import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, Row, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import usePlayerStore from "../../zustand/playerStore";
import { playerApi } from "../../api/player.api";

const ManagePlayer = () => {
  const [form] = useForm();
  const players = usePlayerStore((state) => state.players);
  const removePlayer = usePlayerStore((state) => state.removePlayer);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = async () => {
    const txt = form.getFieldValue("name") || "";
    const res = await playerApi.getListPlayer({ query: txt });
    setUsers(res.data.data);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  // Function to handle delete
  const handleDelete = async (userId) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa cầu thủ",
      onOk: async () => {
        const res = await playerApi.deletePlayer(userId);
        if (res.data.status === 200 || res.data.status === 204) {
          Modal.success({
            title: "Thành công",
            content: "Xóa thành công",
          });
          handleSearch()
        }
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
     </Card>
     <Card>
     <Table
        pagination={{
          position: "bottomCenter",
          pageSize: 10,
          total: players.length,
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
export default ManagePlayer;

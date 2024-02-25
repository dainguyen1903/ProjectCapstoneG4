import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form, Row, Col, Tag } from "antd";
import FormItem from "antd/es/form/FormItem";
import {
  UserOutlined,
  ProductOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import useMatchStore from "../../zustand/matchStore";
const ListMatch = () => {
  const matchs = useMatchStore((state) => state.matches);
  const [form] = useForm();

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [listMatch, setLisstMatch] = useState(matchs);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const deleteMatch = useMatchStore((state) => state.deleteMatch);
  const getStatusColor = (status) => {
    switch (status) {
      case "0":
        return "green"; // Chưa Bắt Đầu
      case "1":
        return "orange"; // Đang Diễn Ra
      case "2":
        return "red"; // Đã Kết Thúc
      default:
        return "black"; // Mặc định
    }
  };
  // Function to handle search
  const handleSearch = (value) => {
    const tournamentName = form.getFieldValue("tournamentName") || "";
    const homeTeam = form.getFieldValue("homeTeam") || "";
    const awayTeam = form.getFieldValue("awayTeam") || "";
    setLisstMatch(
      matchs.filter(
        (i) =>
          i.tournamentName
            .toUpperCase()
            .includes(tournamentName.toUpperCase()) &&
          i.homeTeam
            .toUpperCase()
            .includes(homeTeam.toUpperCase()) &&
          i.awayTeam.toUpperCase().includes(awayTeam.toUpperCase())
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
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa lịch thi đấu",
      onOk: () => {
        deleteMatch(id);
        Modal.success({
          title: "Thành công",
          content: "Xóa thành công",
        });
       handleSearch()
       setLisstMatch(listMatch.filter(i => i.id != id))
      },
    });
  };

  const columns = [
    {
      title: "Tên Giải Đấu",
      dataIndex: "tournamentName",
      key: "tournamentName",
    },
    {
      title: "Vòng Đấu",
      dataIndex: "round",
      key: "round",
    },
    {
      title: "Đội Nhà",
      dataIndex: "homeTeam",
      key: "homeTeam",
    },
    {
      title: "Đội Khách",
      dataIndex: "awayTeam",
      key: "awayTeam",
    },
    {
      title: "Ngày và Giờ",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Sân Vận Động",
      dataIndex: "stadium",
      key: "stadium",
    },
    {
      title: "Tình Trạng Trận Đấu",
      dataIndex: "matchStatus",
      key: "matchStatus",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === "0"
            ? "Chưa Bắt Đầu"
            : status === "1"
            ? "Đang Diễn Ra"
            : "Đã Kết Thúc"}
        </Tag>
      ),
    },
    {
      title: "Kết Quả Trận Đấu",
      dataIndex: "matchResult",
      key: "matchResult",
    },

    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button onClick={() => navigate("/match/edit/" + record.id)}>
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
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item
              name={"tournamentName"}
              label={
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Giải đấu
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={"homeTeam"}
              label={
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Đội nhà
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={"awayTeam"}
              label={
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Đội khách
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Button
              className="Button-no-paading"
              htmlType="submit"
              type="primary"
              shape="round"
            >
              Tìm kiếm
            </Button>
          </Col>
          <Col>
            <Button shape="round" onClick={() => navigate("/match/add")}>
              Thêm lịch thi đấu
            </Button>
          </Col>
        </Row>
      </Form>
      <Table
        pagination={{
          pageSize: 10,
          total: listMatch.length,
          position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={listMatch}
      />
      <Modal
        title="Edit Post"
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
export default ListMatch;

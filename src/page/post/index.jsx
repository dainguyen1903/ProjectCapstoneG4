import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, Row, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useNewsStore from "../../zustand/newsStore";
import { newsApi } from "../../api/news.api";
const PostManage = () => {
  const news = useNewsStore((state) => state.news);
  const [form] = useForm();
  const removeNews = useNewsStore((state) => state.removeNews);

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle search
  const handleSearch = async (value) => {
    const title = form.getFieldValue("title") ?form.getFieldValue("title").trim(): "";
    const res = await newsApi.searchNews({
      search: title,
    });
    if (res.data.status === 200 || res.data.status === 204 ||res.data.status === 204 ) {
      setPosts(res.data.data ? res.data.data.filter(i => i.status): []);
    }
    else{
      setPosts([])
    }
  };
  useEffect(() => {
  handleSearch()
  },[])

  // Function to handle delete
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Xóa bài viết",
      onOk: async () => {
        const res = await newsApi.deleteNews(id);
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

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (value, row) => (
        <Link to={`/news/detail/` + row.id}>{value}</Link>
      ),
    },
    {
      title: "Loại bài viết",
      dataIndex: "typeNewsValue",
      key: "typeNewsValue",
      render: (value, row) => <span>{row?.newsType?.name}</span>,
    },

    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Space size="middle">
            <Button onClick={() => navigate("/news/edit/" + record.id)}>
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
          name={"title"}
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Tiêu đề
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
              <Button shape="round" onClick={() => navigate("/news/add")}>
                Thêm bài viết
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
          total: posts?.length,
          position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={posts}
      />
      </Card>
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
export default PostManage;

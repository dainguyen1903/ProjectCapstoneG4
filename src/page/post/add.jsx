import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
const { Option } = Select;

const AddNewsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const addNews = useNewsStore((state) => state.addNews);
  const news = useNewsStore((state) => state.news);
  const newsDetail = news.find((newsItem) => newsItem.id == id);
  const updateNews = useNewsStore((state) => state.updateNews);
  const [loading, setLoading] = useState(false);
  // Confirm save
  const confirmSave = ({ title, description }) => {
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm bài viết" : "Cập nhật bài viết",
      onOk: () => {
        setTimeout(() => {
          if (id) {
            updateNews(id, { title, description });
          } else {
            addNews({ title, description });
          }
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
          });
          if (!id) {
            form.resetFields();
          }
        }, 1000);
      },
    });
  };
  useEffect(() => {
    if (id) {
      setLoading(true);
      new Promise((resolve) => {
        setTimeout(() => {
          form.setFieldsValue(newsDetail);
          resolve();
        }, 1000);
      }).then(() => {
        setLoading(false);
      });
    }
  }, [id]);
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
      <LoadingFull show={loading} />
    </div>
  );
};

export default AddNewsForm;

import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
const { Option } = Select;
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useNewsCategoryStore from "../../zustand/newsCategoryStore";
const AddNewsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const addNews = useNewsStore((state) => state.addNews);
  const news = useNewsStore((state) => state.news);
  const newsDetail = news.find((newsItem) => newsItem.id == id);
  const updateNews = useNewsStore((state) => state.updateNews);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const newsCategories = useNewsCategoryStore(state => state.newsCategories)
  // Confirm save
  const confirmSave = ({ title, typeNews }) => {
    const typeNewsValue = newsCategories.find(i => i.id ==typeNews )?.name
    
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm bài viết" : "Cập nhật bài viết",
      onOk: () => {
        setTimeout(() => {
          if (id) {
            updateNews(id, { title, description: value ,typeNews,typeNewsValue});
          } else {
            addNews({ title, description: value ,typeNews,typeNewsValue});
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
          setValue(newsDetail.description)
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
        wrapperCol={{ span: 12 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <Form.Item
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
             Loại bài viết
            </span>
          }
          name="typeNews"
          rules={[
            { required: true, message: "Vui lòng chọn loại bài viết!" },
          ]}
        >
         <Select placeholder={"Loại bài viết"} className="Select">
          {newsCategories.map(i => (
            <Option value={i.id}>
              {i.name}
            </Option>
          ))}
         </Select>
        </Form.Item>
        <Form.Item
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Tiêu đề
            </span>
          }
          name="title"
          rules={[
            { required: true, message: "Vui lòng nhập tên tiêu đề bài viết!" },
          ]}
        >
          <Input placeholder="Tên tiêu đề" className="Input" />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập mô tả bài viết!" }]}
          label={
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Mô tả
            </span>
          }
        >
          <ReactQuill
            style={{
              marginBottom: 60,
              height: 400,
            }}
            theme="snow"
            value={value}
            onChange={setValue}
          />
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

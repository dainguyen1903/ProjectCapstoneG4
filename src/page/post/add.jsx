import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
const { Option } = Select;
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useNewsCategoryStore from "../../zustand/newsCategoryStore";
import { newsApi } from "../../api/news.api";
const AddNewsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const addNews = useNewsStore((state) => state.addNews);
  const news = useNewsStore((state) => state.news);
  const updateNews = useNewsStore((state) => state.updateNews);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [listTypeNews, setListTypeNews] = useState([]);
  const navigate = useNavigate();
  // Confirm save
  const confirmSave = ({ title, typeNews }) => {
   const dataPost = {
    title,
    newsType :typeNews ,
    description:value
   }
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm bài viết" : "Cập nhật bài viết",
      onOk: async() => {
        const res = !id ? await newsApi.createrNews(dataPost) : await newsApi.updateNews(id,dataPost)
        if(res.data.status === 200){
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
          });
          navigate(-1);
        }
        
      },
    });
  };

  // get detailNews
  const getDetailNews = async () => {
    setLoading(true);
    const res = await newsApi.getDetailNews(id);
    if (res.data.status === 200) {
      const newsDetail = res.data.data;
      setValue(newsDetail.description)
      form.setFieldsValue(newsDetail);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getDetailNews();
    }
  }, [id]);

  // getListTypeNews
  const getListTypeNews = async () => {
    setListTypeNews([
      {
        id: 1,
        name: "product",
      },
      {
        id: 2,
        name: "football",
      },
    ]);
  };

  useEffect(() => {
    getListTypeNews();
  }, []);
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
          rules={[{ required: true, message: "Vui lòng chọn loại bài viết!" }]}
        >
          <Select placeholder={"Loại bài viết"} className="Select">
            {listTypeNews.map((i) => (
              <Option value={i.id}>{i.name}</Option>
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

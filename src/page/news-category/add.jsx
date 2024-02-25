import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
import useNewsCategoryStore from "../../zustand/newsCategoryStore";
const { Option } = Select;

const NewsCategoryAdd = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const categories = useNewsCategoryStore((state) => state.newsCategories);
  const addCategory = useNewsCategoryStore((state) => state.addNewsCategory);
  const updateCategory = useNewsCategoryStore((state) => state.updateNewsCategory);
  const categoryDetail = categories.find((newsItem) => newsItem.id == id);
  const [loading, setLoading] = useState(false);
  // Confirm save
  const confirmSave = ({ name }) => {
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm danh mục bài viết" : "Cập nhật danh mục bài viết",
      onOk: () => {
        setTimeout(() => {
          if (id) {
            updateCategory(id, { name });
          } else {
            addCategory({ name });
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
          form.setFieldsValue(categoryDetail);
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
        {!id ? "Thêm  danh mục bài viết" : "Cập nhật danh mục bài viết"}
      </h2>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên danh mục bài viết!" },
          ]}
        >
          <Input placeholder="Tên danh mục bài viết" className="Input" />
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

export default NewsCategoryAdd;

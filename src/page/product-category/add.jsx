import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
import useCategoryStore from "../../zustand/productCategoryStore";
const { Option } = Select;

const AddProductCategory = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const categoryDetail = categories.find((newsItem) => newsItem.id == id);
  const [loading, setLoading] = useState(false);
  // Confirm save
  const confirmSave = ({ name }) => {
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm danh mục sản phẩm" : "Cập nhật danh mục sản phẩm",
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
        {!id ? "Thêm  danh mục sản phẩm" : "Cập nhật danh mục sản phẩm"}
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
            { required: true, message: "Vui lòng nhập tên danh mục sản phẩm!" },
          ]}
        >
          <Input placeholder="Tên danh mục sản phẩm" className="Input" />
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

export default AddProductCategory;

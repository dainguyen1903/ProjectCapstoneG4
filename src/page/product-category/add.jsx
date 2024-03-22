import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal ,Card} from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
import useCategoryStore from "../../zustand/productCategoryStore";
import { categoryApi } from "../../api/category.api";
const { Option } = Select;

const AddProductCategory = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const categories = useCategoryStore((state) => state.categories);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Confirm save
  const confirmSave = ({ name }) => {
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm danh mục sản phẩm" : "Cập nhật danh mục sản phẩm",
      onOk: async () => {
        const res = !id ? await categoryApi.createrCategory({ name }) : null;
        if (res.data.status === 200) {
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
          });
          navigate(-1);
        }
      },
    });
  };

  return (
   <Card>
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
   </Card>
  );
};

export default AddProductCategory;

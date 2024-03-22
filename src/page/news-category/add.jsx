import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
import useNewsCategoryStore from "../../zustand/newsCategoryStore";
import { newsApi } from "../../api/news.api";
import { showMessErr } from "../../ultis/helper";
import {Card} from "antd";
const { Option } = Select;

const NewsCategoryAdd = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Confirm save
  const confirmSave = ({ name }) => {
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm danh mục bài viết" : "Cập nhật danh mục bài viết",
      onOk: async () => {
        const dataPost = {
          name,
          description: "description",
        };
        const res = !id
          ? await newsApi.createrNewsType(dataPost)
          : await newsApi.updateNewsType(id, dataPost);
        if (res.data.status === 200) {
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
            onOk:() => {
              navigate(-1);
            }
          });
         
        }
        else{
          showMessErr(res.data)
        }
      },
    });
  };

  const getDetail = async () => {
    setLoading(true);
    const res = await newsApi.getDetailNewsType(id);
    if (res.data.status === 200) {
      form.setFieldsValue(res.data.data);
    } else {
      showMessErr(res.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);
  return (
 <Card>
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
 </Card>
  );
};

export default NewsCategoryAdd;

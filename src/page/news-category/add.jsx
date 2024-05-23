import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
import useNewsCategoryStore from "../../zustand/newsCategoryStore";
import { newsApi } from "../../api/news.api";
import {
  ERROR_KEY,
  handleError,
  objectCheckErrorInput,
  showMessErr,
  showMessErr400,
} from "../../ultis/helper";
import { Card } from "antd";
const { Option } = Select;

const NewsCategoryAdd = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
  });
  const [err, setErr] = useState({
    name: "",
  });
  // Confirm save
  const confirmSave = ({ name }) => {
    if (isErr) {
      return;
    }
    if (!validate()) {
      return;
    }
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm danh mục bài viết" : "Cập nhật danh mục bài viết",
      onOk: async () => {
        try {
          const dataPost = {
            name: data?.name?.trim(),
            description: "description",
          };
          const res = !id
            ? await newsApi.createrNewsType(dataPost)
            : await newsApi.updateNewsType(id, dataPost);
          if (res.data.status === 200 || res.data.status === 204) {
            Modal.success({
              title: "Thành công",
              content: !id ? "Thêm thành công" : "Cập nhật thành công",
              onOk: () => {
                navigate(-1);
              },
            });
          } else {
            showMessErr400(res);
          }
        } catch (error) {
          handleError(error);
        }
      },
    });
  };
  const handleChange = (field, value, listRule, prefix = "") => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    const listErr = [];
    listRule.forEach((rule) => {
      const txtErr = objectCheckErrorInput[rule](value, prefix);
      if (txtErr) {
        listErr.push(txtErr);
      }
    });
    if (listErr.length === 0) {
      handleSetErr(field, "");
    } else {
      handleSetErr(field, listErr[0]);
    }
  };
  const handleSetErr = (field, value) => {
    setErr((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const getDetail = async () => {
    setLoading(true);
    const res = await newsApi.getDetailNewsType(id);
    if (res.data.status === 200 || res.data.status === 204) {
      setData({...data,name:res.data.data.name});
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
  const validate = () => {
    let newErr = { ...err };
    let isFlagErr = false;
    if (!data.name) {
      isFlagErr = true;
      newErr = { ...newErr, name: "Tên danh mục bài viết không được để trống" };
    } else {
      newErr = { ...newErr, name: "" };
    }

    setErr(newErr);
    return !isFlagErr;
  };
  const isErr = Object.values(err).filter((i) => i)?.length > 0;

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
          <div className="inputLabel">Tên danh mục bài viết</div>

          <Form.Item name="name">
            <Input
              value={data.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value,
                  [ERROR_KEY.BLANK],
                  "Tên danh mục bài viết không được để trống"
                )
              }
              placeholder="Tên danh mục bài viết"
              className="Input"
            />
            <div className="txt-err">{err?.name}</div>
          </Form.Item>

          <Form.Item>
            <button
              style={{ marginTop: 10 }}
              className="Button"
              htmlType="submit"
              type="primary"
            >
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

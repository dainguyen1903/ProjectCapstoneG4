import {
  Form,
  Input,
  Modal,
  Select,
  Button,
  Card,
  Col,
  Row,
  message,
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { newsApi } from "../../api/news.api";
import LoadingFull from "../../component/loading/loadingFull";
import AddImage from "../../component/common/AddImage";
import {
  ERROR_KEY,
  handleError,
  objectCheckErrorInput,
  showMessErr400,
} from "../../ultis/helper";
const { Option } = Select;
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const AddNewsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [listTypeNews, setListTypeNews] = useState([]);
  const [url, setUrl] = useState(null);
  const [imageName, setImageName] = useState("");
  const fileRef = useRef();
  const navigate = useNavigate();
  const [txtErr, setTxtErr] = useState("");
  const [data, setData] = useState({
    typeNews: "",
    title: "",
    description: "",
    imageUrl: "",
  });
  const [err, setErr] = useState({
    typeNews: "",
    title: "",
    description: "",
    imageUrl: "",
  });
  // Confirm save
  const confirmSave = ({ title, typeNews }) => {
    if (isErr) {
      return;
    }
    if (!validate()) {
      return;
    }
    const dataPost = {
      title:data.title,
      newsType: data.typeNews,
      description: data.description,
      imageUrl: url,
    };
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm bài viết" : "Cập nhật bài viết",
      onOk: async () => {
        try {
          const res = !id
            ? await newsApi.createrNews(dataPost)
            : await newsApi.updateNews(id, dataPost);
          if (res.data.status === 200 || res.data.status === 204) {
            Modal.success({
              title: "Thành công",
              content: !id ? "Thêm thành công" : "Cập nhật thành công",
            });
            navigate(-1);
          } else {
            showMessErr400(res);
          }
        } catch (error) {
          handleError(error);
        }
      },
    });
  };
  useEffect(() => {
    if(url){
      setErr({...err,imageUrl:""})
    }
  },[url])
  // get detailNews
  const getDetailNews = async () => {
    setLoading(true);
    const res = await newsApi.getDetailNews(id);
    if (res.data.status === 200 || res.data.status === 204) {
      const newsDetail = res.data.data;
      
      setUrl(newsDetail.imageUrl);
      console.log(newsDetail.newsType?.name)
      setData({
        title:newsDetail.title,
        description:newsDetail.description,
        typeNews:newsDetail.newsType?.name
      })
      form.setFieldsValue(newsDetail);
    }
    setLoading(false);
  };

  const getListNewType = async () => {
    const res = await newsApi.searchNewsType({ search: "" });
    if (res.data.status === 200 || res.data.status === 204) {
      const listOptionType = res.data.data.map((i) => ({
        id: i.name,
        name: i.name,
      }));
      setListTypeNews(listOptionType);
    }
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setImageName(file.name);
      setUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    getListNewType();
  }, []);
  useEffect(() => {
    if (id) {
      getDetailNews();
    }
  }, [id]);
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
  const validate = () => {
    let newErr = { ...err };
    let isFlagErr = false;
    if (!data.title) {
      isFlagErr = true;
      newErr = { ...newErr, title: "Tiêu đề không được để trống" };
    } else {
      newErr = { ...newErr, title: "" };
    }
    if (!data.typeNews) {
      isFlagErr = true;
      newErr = { ...newErr, typeNews: "Loại bài viết không được để trống" };
    } else {
      newErr = { ...newErr, typeNews: "" };
    }
    if (!data.description) {
      isFlagErr = true;
      newErr = { ...newErr, description: "Nội dung bài viết không được để trống" };
    } else {
      newErr = { ...newErr, description: "" };
    }
    if (!url) {
      isFlagErr = true;
      newErr = { ...newErr, imageUrl: "Ảnh tiêu đề không được để trống" };
    } else {
      newErr = { ...newErr, imageUrl: "" };
    }

    setErr(newErr);
    return !isFlagErr;
  };
  const isErr = Object.values(err).filter((i) => i)?.length > 0;

  return (
    <Card>
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <div>
          <h2 style={{ marginBottom: 30, textAlign: "center" }}>
            {!id ? "Thêm bài viết" : "Cập nhật bài viết"}
          </h2>

          <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <div
                    style={{
                      paddingBottom: 10,
                    }}
                    className="inputLabel"
                  >
                    Loại bài viết
                  </div>
                  <Form.Item
                    
                  >
                    <Select value={data.typeNews} onChange={(v) => {
                      setData({...data,typeNews:v});
                      setErr({...err,typeNews:""})
                    }} placeholder={"Loại bài viết"} className="Select">
                      {listTypeNews.map((i) => (
                        <Option value={i.id}>{i.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <div className="txt-err">{err?.typeNews}</div>

                  <div className="inputLabel">Tiêu đề</div>
                  <Form.Item name="title">
                    <Input
                      value={data.title}
                      onChange={(e) =>
                        handleChange(
                          "title",
                          e.target.value,
                          [ERROR_KEY.BLANK],
                          "Tiêu đề bài viết"
                        )
                      }
                      placeholder="Tên tiêu đề"
                      className="Input"
                    />
                    <div className="txt-err">{err?.title}</div>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <AddImage
                    txt="Thêm ảnh tiêu đề"
                    url={url}
                    click={() => fileRef.current.click()}
                  />
                  <div style={{ color: "red", textAlign: "center" }}>
                  <div className="txt-err">{err?.imageUrl}</div>

                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Col style={{ marginTop: 10 }} span={24}>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              <span>Mô tả</span>
            </div>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng nhập mô tả bài viết!" },
              ]}
            >
              <ReactQuill
              className="ok"
                style={{
                  marginBottom: 80,
                  height: 400,
                }}
                theme="snow"
                value={data.description}
                onChange={(e) =>
                  handleChange(
                    "description",
                    e,
                    [ERROR_KEY.BLANK],
                    "Nội dung bài viết"
                  )
                }
                modules={modules}
                formats={formats}
              />
              <div style={{marginTop:-35}} className="txt-err">{err?.description}</div>
            </Form.Item>
          </Col>
          <Form.Item>
            <button className="Button" htmlType="submit" type="primary">
              {id ? "Cập nhật" : "Tạo mới"}
            </button>
          </Form.Item>
          <LoadingFull show={loading} />
        </div>
      </Form>
      <input
        ref={fileRef}
        type="file"
        style={{
          display: "none",
        }}
        onChange={handleChangeFile}
      />
    </Card>
  );
};

export default AddNewsForm;

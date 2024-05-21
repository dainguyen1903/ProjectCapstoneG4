import { Form, Input, Modal, Select, Button, Card, Col, Row, message } from "antd";
import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { newsApi } from "../../api/news.api";
import LoadingFull from "../../component/loading/loadingFull";
import AddImage from "../../component/common/AddImage";
import { handleError, showMessErr400 } from "../../ultis/helper";
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
  // Confirm save
  const confirmSave = ({ title, typeNews }) => {
    if (!url) {
      setTxtErr("Vui lòng chọn ảnh");
      return;
    } else {
      setTxtErr("");
    }
    const dataPost = {
      title,
      newsType: typeNews,
      description: value,
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
      }
      else{
        showMessErr400(res)
      }
       } catch (error) {
        handleError(error)
       }
      },
    });
  };

  // get detailNews
  const getDetailNews = async () => {
    setLoading(true);
    const res = await newsApi.getDetailNews(id);
    if (res.data.status === 200 || res.data.status === 204) {
      const newsDetail = res.data.data;
      setValue(newsDetail.description);
      newsDetail.typeNews = newsDetail?.newsType?.name;
      setUrl(newsDetail.imageUrl);
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
                <div style={{
                        paddingBottom:10
                      }} className="inputLabel">Loại bài viết</div>
                  <Form.Item
                  
                    name="typeNews"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn loại bài viết!",
                      },
                    ]}
                  >
                     
                    <Select placeholder={"Loại bài viết"} className="Select">
                      {listTypeNews.map((i) => (
                        <Option value={i.id}>{i.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <div className="inputLabel">Tiêu đề</div>
                  <Form.Item
                    
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tiêu đề bài viết!",
                      },
                    ]}
                  >
                   
                    <Input placeholder="Tên tiêu đề" className="Input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <AddImage
                    txt="Thêm ảnh tiêu đề"
                    url={url}
                    click={() => fileRef.current.click()}
                  />
                  <div style={{ color: "red", textAlign: "center" }}>
                    {txtErr}
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
                style={{
                  marginBottom: 80,
                  height: 400,
                }}
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
              />
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

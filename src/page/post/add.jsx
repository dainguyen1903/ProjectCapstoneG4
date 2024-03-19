import { Form, Input, Modal, Select,Button } from "antd";
import React, { useEffect, useState ,useRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { newsApi } from "../../api/news.api";
import LoadingFull from "../../component/loading/loadingFull";
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
  // Confirm save
  const confirmSave = ({ title, typeNews }) => {
    const dataPost = {
      title,
      newsType: typeNews,
      description: value,
      imagesNewsList:[url]
    };
    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm bài viết" : "Cập nhật bài viết",
      onOk: async () => {
        const res = !id
          ? await newsApi.createrNews(dataPost)
          : await newsApi.updateNews(id, dataPost);
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

  // get detailNews
  const getDetailNews = async () => {
    setLoading(true);
    const res = await newsApi.getDetailNews(id);
    if (res.data.status === 200) {
      const newsDetail = res.data.data;
      setValue(newsDetail.description);
      setUrl(newsDetail.imagesNewsList[0]?.path)
      form.setFieldsValue(newsDetail);
    }
    setLoading(false);
  };

  const getListNewType = async () => {
    const res = await newsApi.searchNewsType({ search: "" });
    if (res.data.status === 200) {
      const listOptionType = res.data.data.map((i) => ({
        id: i.id,
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
                marginBottom:-5
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
          <Input  placeholder="Tên tiêu đề" className="Input" />
        </Form.Item>
        <Form.Item  name="imageUrl">
          <Button
            onClick={() => fileRef.current.click()}
            style={{
            
              marginRight: 10,
            }}
          >
            Thêm Ảnh Tiêu đề
          </Button>{" "}
          <div>
            {url && <img style={{
              width:70,
              height:70,
              objectFit:"contain"
            }} src={url} />}
          </div>
          <div
            className="flex-start"
            style={{
              alignItems: "center",
            }}
          ></div>
          <input
            style={{
              display: "none",
            }}
            ref={fileRef}
            onChange={handleChangeFile}
            placeholder="Ảnh"
            type="file"
            className="Input"
          />
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

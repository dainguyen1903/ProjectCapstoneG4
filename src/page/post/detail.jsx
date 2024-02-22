import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
const { Option } = Select;

const DetailNews = () => {
  const { id } = useParams();
  const news = useNewsStore((state) => state.news);
  const newsDetail = news.find((newsItem) => newsItem.id == id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        setTitle(newsDetail.title);
        setDescription(newsDetail.description);
        resolve();
      }, 1000);
    }).then(() => {
      setLoading(false);
    });
  }, [id]);
  return (
    <div>
      <h2
        style={{
          fontSize: 20,
        }}
      >
        Bài viết chi tết
      </h2>
      <p>
        <span
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {" "}
          Tiêu đề :
        </span>{" "}
        {title}
      </p>
      <p
        style={{
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Mô tả :{" "}
      </p>
      <p>{description}</p>
      <LoadingFull show={loading} />
    </div>
  );
};

export default DetailNews;

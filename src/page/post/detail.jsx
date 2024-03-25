import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal, Card } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import useNewsStore from "../../zustand/newsStore";
import LoadingFull from "../../component/loading/loadingFull";
import { newsApi } from "../../api/news.api";
const { Option } = Select;

const DetailNews = () => {
  const { id } = useParams();
  const news = useNewsStore((state) => state.news);
  const newsDetail = news.find((newsItem) => newsItem.id == id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  // get detailNews
  const getDetailNews = async () => {
    setLoading(true);
    const res = await newsApi.getDetailNews(id);
    if (res.data.status === 200 || res.data.status === 204) {
      const newsDetail = res.data.data;
      setDescription(newsDetail.description)
     setTitle(newsDetail.title)
    }
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getDetailNews();
    }
  }, [id]);
 
  return (
   <Card>
     <div>
      <h2
        style={{
          fontSize: 20,
        }}
      >
      
      </h2>
      <h1>{title}</h1>
      <p
        style={{
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
       
        <div dangerouslySetInnerHTML={{ __html:description  }} />
      </p>
      <LoadingFull show={loading} />
    </div>
   </Card>
  );
};

export default DetailNews;

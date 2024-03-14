import React, { useEffect, useState } from "react";
import "./Blog.scss";
import { useParams } from "react-router-dom";
import { newsApi } from "../../api/news.api";
import moment from "moment";
import CommentCpn from "../../components/Comment/Comment";
const BlogDetail = () => {
    const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const getDetailNews = async () => {
    const res =await newsApi.getDetailNews(id);
    if (res.data.status === 200) {
      setDetail(res.data.data);
    }
  };
  useEffect(() => {
    getDetailNews();
  }, []);
  
  return (
    <div class="container bootstrap snippets bootdeys" style={{
        minHeight:"80vh",
        marginTop:20
    }}>
      <section style={{
        
      }} >
      <h1 style={{
        fontSize:40,
        
      }}>{detail.title}</h1>
      <p style={{
        color:"gray",
        fontSize:14,
        marginTop:-10
      }}>{detail.dateCreate && moment(detail.dateCreate).format("DD MMMM, YYYY")}</p>
      <p>{detail.description}</p>
      <CommentCpn comments={comments} setComments={setComments} />
      </section>
      
    </div>
  );
};

export default BlogDetail;

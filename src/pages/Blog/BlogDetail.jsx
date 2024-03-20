import React, { useEffect, useState } from "react";
import "./Blog.scss";
import { useParams } from "react-router-dom";
import { newsApi } from "../../api/news.api";
import moment from "moment";
import CommentCpn from "../../components/Comment/Comment";
const BlogDetail = () => {
  const [comments, setComments] = useState([{
    author: {
      name:"User 1",
      id: 1212121,
    },
    avatar: "",
    content: "comment1",
    datetime: moment().fromNow(),
    id:Math.random()*199999
  },
  {
    author: {
      name:"User 2",
      id: 1212122,
    },
    avatar: "",
    content: "comment2",
    datetime: moment().fromNow(),
    id:Math.random()*199999
  },
  {
    author: {
      name:"User 3",
      id: 1212123,
    },
    avatar: "",
    content: "comment3",
    datetime: moment().fromNow(),
    id:Math.random()*199999
  },
  
]);  const { id } = useParams();
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
     <div dangerouslySetInnerHTML={{ __html: detail.description }} />
      <CommentCpn comments={comments} setComments={setComments} />
      </section>
      
    </div>
  );
};

export default BlogDetail;

import React, { useEffect, useState } from "react";
import "./Blog.scss";
import { newsApi } from "../../api/news.api";
import BlogItem from "./BlogItem";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { getQueryParams } from "../../utils/helpers";
const Blog = () => {
  const location = useLocation()
  const [listBlog, setListBlog] = useState([]);
  const {search} = getQueryParams();
  const getListBlog = async () => {
    const res = await newsApi.searchNews({search:search||""});
    if (res.data.status === 200 || res.data.status === 204) {
      setListBlog(res.data.data || []);
    }
  };
  useEffect(() => {
    
    getListBlog();
  }, [location.search]);
  return (
    <div class="container bootstrap snippets bootdeys">
      <section class="blog" id="blog">
        <div class="container">
          <div class="title">
            <h2>Latest Blog</h2>
          </div>
          <div class="blog-content">
            {listBlog.map((i, index) => (
              <BlogItem
                key={index}
                {...i}
                date={moment(i.dateCreate).format("DD MMMM, YYYY")}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

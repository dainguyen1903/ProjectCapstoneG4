import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./Blog.scss";
const BlogItem = ({
  img = "https://thinkzone.vn/uploads/2022_01/blogging-1641375905.jpg",
  dateCreate,
  date,
  title,
  description,
  id,
  imagesNewsList,
}) => {
  const navigate = useNavigate();
  return (
    <div class="blog-item">
      <div class="blog-img">
        <img
          style={{
            height: 200,
            objectFit: "cover",
          }}
          src={imagesNewsList && imagesNewsList[0]?.path}
          alt=""
        />
        <span>
          <i class="far fa-heart"></i>
        </span>
      </div>
      <div class="blog-text">
        <span style={{
          fontSize:12,
          marginTop:5,
          color:"gray"
        }}>{dateCreate && moment(dateCreate).format("YYYY-MM-DD")}</span>
        <p
          className="one-line"
          style={{
            fontWeight: "bold",
            fontSize: 18,
            height: 25,
          }}
        >
          {title}
        </p>
        <div
          style={{
            display: "block",
            marginTop: 10,
          }}
        >
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/blog/" + id);
            }}
            className="point"
          >
            Xem thêm
          </a>
        </div>
      </div>
    </div>
  );
};
export default BlogItem;

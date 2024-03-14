import { useNavigate } from "react-router-dom";
import "./Blog.scss"
const BlogItem  = ({
    img="https://thinkzone.vn/uploads/2022_01/blogging-1641375905.jpg",date,title,description,id
}) => {
  const navigate = useNavigate();
    return (
        <div class = "blog-item">
        <div class = "blog-img">
          <img src ={img} alt = ""/>
          <span><i class = "far fa-heart"></i></span>
        </div>
        <div class = "blog-text">
          <span>{date}</span>
          <h2 style={{
            fontWeight:"bold"
          }}>{title}</h2>
          <p>{description}</p>
          <a onClick={(e) => {
            e.preventDefault();
            navigate("/blog/"+id)
          }} className="point" >Xem thêm</a>
        </div>
      </div>
    )
}
export default BlogItem;
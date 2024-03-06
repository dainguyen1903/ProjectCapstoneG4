import "./Blog.scss"
const BlogItem  = ({
    img,date,title,description
}) => {
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
          <a href = "#">Read More</a>
        </div>
      </div>
    )
}
export default BlogItem;
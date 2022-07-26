import Togglable from "./Togglable";

const Blog = ({blog, toggleLike}) => (
  <li className="blog-item">
      title: {blog.title} author: {blog.author}
      <Togglable buttonLabel="view">
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}<button className="button-like" onClick={toggleLike} type="button">like</button></p>
      </Togglable>
  </li>
)

export default Blog

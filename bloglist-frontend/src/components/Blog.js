import Togglable from "./Togglable";

const Blog = ({blog, toggleLike, removeBlog}) => {

    const me = window.localStorage.getItem('loggedUser')

    return (
      <li className="blog-item">
          title: {blog.title} author: {blog.author}
          <Togglable buttonLabel="view">
              <p>url: {blog.url}</p>
              <p>likes: {blog.likes}<button className="button-like" onClick={toggleLike} type="button">like</button></p>
          </Togglable>
          {blog.user.username === me.username && <button type="button" onClick={removeBlog}>delete</button>}
      </li>
    )
}

export default Blog

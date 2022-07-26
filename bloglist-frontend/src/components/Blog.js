import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, toggleLike, removeBlog }) => {

    const userFromStorage = window.localStorage.getItem('loggedUser')
    const me = JSON.parse(userFromStorage)

    return (
        <li className="blog">
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <Togglable buttonLabel="view">
                <p>{blog.url}</p>
                <p>{blog.likes}</p>
                <button className="button-like" onClick={toggleLike} type="button">like</button>
            </Togglable>
            {blog.user.username !== null && blog.user.username === me.username && <button type="button" onClick={removeBlog}>delete</button>}
        </li>
    )
}

Blog.propTypes={
    blog: PropTypes.object.isRequired,
    toggleLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
}

export default Blog

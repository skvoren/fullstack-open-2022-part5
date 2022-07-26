import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, toggleLike, removeBlog }) => {

    const userFromStorage = window.localStorage.getItem('loggedUser')
    const me = JSON.parse(userFromStorage)

    return (
        <li className="blog">
            <ul>
                <li>title: {blog.title}</li>
                <li>author: {blog.author}</li>
            </ul>
            <Togglable buttonLabel="view">
                <ul>
                    <li>url: {blog.url}</li>
                    <li>likes: {blog.likes}</li>
                </ul>
                <button className="button-like" onClick={toggleLike} type="button">like</button>
            </Togglable>
            {blog.user.username !== null && blog.user.username === me.username && <button type="button" onClick={removeBlog} className="button-delete">delete</button>}
        </li>
    )
}

Blog.propTypes={
    blog: PropTypes.object.isRequired,
    toggleLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
}

export default Blog

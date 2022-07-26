import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleChangeUrl = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form className="blog-form" onSubmit={addBlog}>
                <input value={title} onChange={handleChangeTitle} placeholder="title"/>
                <input value={author} onChange={handleChangeAuthor} placeholder="author"/>
                <input value={url} onChange={handleChangeUrl} placeholder="url"/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createdBlog: PropTypes.func
}

export default BlogForm

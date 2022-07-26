import {useState} from "react";

const BlogForm = ({createBlog}) => {
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
                title <input value={title} onChange={handleChangeTitle}/>
                author <input value={author} onChange={handleChangeAuthor}/>
                url <input value={url} onChange={handleChangeUrl}/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm

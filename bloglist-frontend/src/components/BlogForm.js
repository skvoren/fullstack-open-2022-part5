function BlogForm({
    title,
    author,
    url,
    handleChangeTitle,
    handleChangeAuthor,
    handleChangeUrl,
    handleSubmit}) {
    return (
        <div>
            <form className="blog-form" onSubmit={handleSubmit}>
                title <input value={title} onChange={handleChangeTitle}/>
                author <input value={author} onChange={handleChangeAuthor}/>
                url <input value={url} onChange={handleChangeUrl}/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm

import React from "react";
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test('test <BlogForm/>', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog}/>)

    const inputTitle = screen.getByPlaceholderText('title')
    const inputAuthor = screen.getByPlaceholderText('author')
    const inputUrl = screen.getByPlaceholderText('url')

    const buttonCreate = screen.getByText('create')

    await user.type(inputTitle, 'David')
    await user.type(inputAuthor, 'Coulthard')
    await user.type(inputUrl, 'McLaren')

    await user.click(buttonCreate)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('David')
    expect(createBlog.mock.calls[0][0].author).toBe('Coulthard')
    expect(createBlog.mock.calls[0][0].url).toBe('McLaren')
})

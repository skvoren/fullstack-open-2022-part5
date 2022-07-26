import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render blog content', () => {

    const testLogin = ({
        username: 'testUserName',
        token: 'key'
    })

    localStorage.setItem('loggedUser', JSON.stringify(testLogin))

    const blog = {
        title: 'Jarno',
        author: 'Trulli',
        user: 'testUserName'
    }

    render(<Blog blog={blog} removeBlog={() => {}} toggleLike={() => {}}/>)

    const titleElement = screen.getByText('title: Jarno')
    const authorElement = screen.getByText('author: Trulli')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
})

test('render blog extended content', async () => {
    const testLogin = ({
        username: 'testUserName',
        token: 'key'
    })

    localStorage.setItem('loggedUser', JSON.stringify(testLogin))

    const blog = {
        title: 'Jarno',
        author: 'Trulli',
        url: 'Url',
        likes: 10,
        user: 'testUserName'
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} removeBlog={mockHandler} toggleLike={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const titleElement = screen.getByText('title: Jarno')
    const authorElement = screen.getByText('author: Trulli')
    const urlElement = screen.getByText('url: Url')
    const likes = screen.getByText('likes: 10')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(urlElement).toBeDefined()
    expect(likes).toBeDefined()
})

test('test likes button pressed twice', async () => {
    const testLogin = ({
        username: 'testUserName',
        token: 'key'
    })

    localStorage.setItem('loggedUser', JSON.stringify(testLogin))

    const blog = {
        title: 'Jarno',
        author: 'Trulli',
        url: 'Url',
        likes: 10,
        user: 'testUserName'
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} removeBlog={mockHandler} toggleLike={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

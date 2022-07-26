import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('render content', () => {

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

    const titleElement = screen.getByText('Jarno')
    const authorElement = screen.getByText('Trulli')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
})

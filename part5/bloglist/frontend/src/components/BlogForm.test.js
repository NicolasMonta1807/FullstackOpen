import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('handler is called when the form is submitted', async () => {
    const createBlog = jest.fn()
    const { container } = render(<BlogForm createBlog={createBlog} />)
    const user = userEvent.setup()

    const titleInput = container.querySelector('#titleInput')
    await user.type(titleInput, 'Test blog title')
    const authorInput = container.querySelector('#authorInput')
    await user.type(authorInput, 'jest')
    const urlInput = container.querySelector('#urlInput')
    await user.type(urlInput, 'fullstackopen.com/en')

    const submitButton = screen.getByText('Create')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('jest')
    expect(createBlog.mock.calls[0][0].url).toBe('fullstackopen.com/en')
  })
})

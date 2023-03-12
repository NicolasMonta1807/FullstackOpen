import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing blog',
    author: 'jest',
    likes: 55,
    url: 'fullstackopen.com/en',
    user: {
      username: 'jest'
    }
  }
  let container
  const handleLike = jest.fn()
  const handleDelete = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        userId={blog.user.username}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    ).container
  })

  test('title and author are shown by default', async () => {
    screen.getByText(`${blog.title} by ${blog.author}`)
    const details = container.querySelector('#blogDetails')
    expect(details).toBeNull()
  })

  test('details are shown when view button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const details = container.querySelector('#blogDetails')
    expect(details).not.toBeNull()
    expect(details.textContent).toContain(`${blog.likes}`)
    expect(details.textContent).toContain(`${blog.url}`)
  })

  test('handle like function is called everytime the like button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TodoInput from './TodoInput'

describe('TodoInput', () => {
  it('should render input and button', () => {
    render(<TodoInput onAdd={vi.fn()} />)

    expect(screen.getByPlaceholderText('添加新任务...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '添加' })).toBeInTheDocument()
  })

  it('should call onAdd when submitting', async () => {
    const onAdd = vi.fn()
    render(<TodoInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('添加新任务...')
    const button = screen.getByRole('button', { name: '添加' })

    await userEvent.type(input, 'New task')
    await userEvent.click(button)

    expect(onAdd).toHaveBeenCalledWith('New task')
    expect(input).toHaveValue('')
  })

  it('should not call onAdd for empty input', async () => {
    const onAdd = vi.fn()
    render(<TodoInput onAdd={onAdd} />)

    const button = screen.getByRole('button', { name: '添加' })
    expect(button).toBeDisabled()

    await userEvent.click(button)
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('should submit on Enter key', async () => {
    const onAdd = vi.fn()
    render(<TodoInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('添加新任务...')
    await userEvent.type(input, 'Enter task{enter}')

    expect(onAdd).toHaveBeenCalledWith('Enter task')
  })
})

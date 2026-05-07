import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TodoItem from './TodoItem'
import { Todo } from '../types/todo'
import { translations } from '../i18n'

const mockTodo: Todo = {
  id: '1',
  text: 'Test todo',
  completed: false,
  createdAt: Date.now(),
}

const labels = translations.zh.item

describe('TodoItem', () => {
  it('should render todo text', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        labels={labels}
      />
    )

    expect(screen.getByText('Test todo')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('should show completed state', () => {
    render(
      <TodoItem
        todo={{ ...mockTodo, completed: true }}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        labels={labels}
      />
    )

    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(screen.getByText('Test todo')).toHaveClass('completed')
  })

  it('should call onToggle when checkbox clicked', async () => {
    const onToggle = vi.fn()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={onToggle}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        labels={labels}
      />
    )

    await userEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('should call onDelete when delete button clicked', async () => {
    const onDelete = vi.fn()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={vi.fn()}
        onDelete={onDelete}
        onEdit={vi.fn()}
        labels={labels}
      />
    )

    await userEvent.click(screen.getByTitle('删除'))
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('should enter edit mode and save on blur', async () => {
    const onEdit = vi.fn()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={onEdit}
        labels={labels}
      />
    )

    await userEvent.click(screen.getByTitle('编辑'))

    const editInput = screen.getByDisplayValue('Test todo')
    await userEvent.clear(editInput)
    await userEvent.type(editInput, 'Updated todo')
    await userEvent.tab()

    expect(onEdit).toHaveBeenCalledWith('1', 'Updated todo')
  })

  it('should save on Enter key in edit mode', async () => {
    const onEdit = vi.fn()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={onEdit}
        labels={labels}
      />
    )

    await userEvent.click(screen.getByTitle('编辑'))

    const editInput = screen.getByDisplayValue('Test todo')
    await userEvent.clear(editInput)
    await userEvent.type(editInput, 'Enter saved{enter}')

    expect(onEdit).toHaveBeenCalledWith('1', 'Enter saved')
  })

  it('should cancel edit on Escape key', async () => {
    const onEdit = vi.fn()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={onEdit}
        labels={labels}
      />
    )

    await userEvent.click(screen.getByTitle('编辑'))

    const editInput = screen.getByDisplayValue('Test todo')
    await userEvent.clear(editInput)
    await userEvent.type(editInput, 'Aborted{escape}')

    expect(onEdit).not.toHaveBeenCalled()
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })
})

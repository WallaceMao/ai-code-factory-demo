import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TodoList from './TodoList'
import { Todo } from '../types/todo'
import { translations } from '../i18n'

const mockTodos: Todo[] = [
  { id: '1', text: 'Todo 1', completed: false, createdAt: Date.now() },
  { id: '2', text: 'Todo 2', completed: true, createdAt: Date.now() },
]

const labels = {
  emptyState: translations.zh.list.emptyState,
  item: translations.zh.item,
}

describe('TodoList', () => {
  it('should render empty state when no todos', () => {
    render(
      <TodoList
        todos={[]}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        labels={labels}
      />
    )

    expect(screen.getByText('暂无任务')).toBeInTheDocument()
  })

  it('should render list of todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        labels={labels}
      />
    )

    expect(screen.getByText('Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Todo 2')).toBeInTheDocument()
    expect(screen.queryByText('暂无任务')).not.toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TodoFilter from './TodoFilter'

describe('TodoFilter', () => {
  it('should render filter buttons', () => {
    render(
      <TodoFilter
        filter="all"
        onChange={vi.fn()}
        activeCount={3}
        completedCount={2}
        onClearCompleted={vi.fn()}
      />
    )

    expect(screen.getByText('3 个待办')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '全部' })).toHaveClass('active')
    expect(screen.getByRole('button', { name: '进行中' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: '已完成' })).not.toHaveClass('active')
  })

  it('should call onChange when filter clicked', async () => {
    const onChange = vi.fn()
    render(
      <TodoFilter
        filter="all"
        onChange={onChange}
        activeCount={1}
        completedCount={0}
        onClearCompleted={vi.fn()}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: '进行中' }))
    expect(onChange).toHaveBeenCalledWith('active')

    await userEvent.click(screen.getByRole('button', { name: '已完成' }))
    expect(onChange).toHaveBeenCalledWith('completed')
  })

  it('should show clear button when there are completed todos', () => {
    render(
      <TodoFilter
        filter="all"
        onChange={vi.fn()}
        activeCount={1}
        completedCount={2}
        onClearCompleted={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: '清除已完成' })).toBeInTheDocument()
  })

  it('should hide clear button when no completed todos', () => {
    render(
      <TodoFilter
        filter="all"
        onChange={vi.fn()}
        activeCount={1}
        completedCount={0}
        onClearCompleted={vi.fn()}
      />
    )

    expect(screen.queryByRole('button', { name: '清除已完成' })).not.toBeInTheDocument()
  })

  it('should call onClearCompleted when clear button clicked', async () => {
    const onClearCompleted = vi.fn()
    render(
      <TodoFilter
        filter="all"
        onChange={vi.fn()}
        activeCount={1}
        completedCount={2}
        onClearCompleted={onClearCompleted}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: '清除已完成' }))
    expect(onClearCompleted).toHaveBeenCalled()
  })
})

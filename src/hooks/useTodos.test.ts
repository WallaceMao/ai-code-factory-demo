import { renderHook, act } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTodos } from './useTodos'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

beforeEach(() => {
  localStorageMock.clear()
})

describe('useTodos', () => {
  it('should initialize with empty todos', () => {
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toEqual([])
    expect(result.current.activeCount).toBe(0)
    expect(result.current.completedCount).toBe(0)
  })

  it('should add a todo', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Learn Vitest')
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Learn Vitest')
    expect(result.current.todos[0].completed).toBe(false)
    expect(result.current.activeCount).toBe(1)
  })

  it('should not add empty todo', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('  ')
    })

    expect(result.current.todos).toHaveLength(0)
  })

  it('should toggle todo completion', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Toggle me')
    })

    const id = result.current.todos[0].id

    act(() => {
      result.current.toggleTodo(id)
    })

    expect(result.current.todos[0].completed).toBe(true)
    expect(result.current.activeCount).toBe(0)
    expect(result.current.completedCount).toBe(1)

    act(() => {
      result.current.toggleTodo(id)
    })

    expect(result.current.todos[0].completed).toBe(false)
  })

  it('should delete a todo', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Delete me')
    })

    const id = result.current.todos[0].id

    act(() => {
      result.current.deleteTodo(id)
    })

    expect(result.current.todos).toHaveLength(0)
  })

  it('should edit a todo', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Old text')
    })

    const id = result.current.todos[0].id

    act(() => {
      result.current.editTodo(id, 'New text')
    })

    expect(result.current.todos[0].text).toBe('New text')
  })

  it('should clear completed todos', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Active task')
      result.current.addTodo('Completed task')
    })

    const completedId = result.current.todos[1].id

    act(() => {
      result.current.toggleTodo(completedId)
      result.current.clearCompleted()
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Active task')
  })

  it('should filter todos', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Task 1')
      result.current.addTodo('Task 2')
    })

    const id1 = result.current.todos[0].id

    act(() => {
      result.current.toggleTodo(id1)
      result.current.setFilter('active')
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Task 2')

    act(() => {
      result.current.setFilter('completed')
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Task 1')

    act(() => {
      result.current.setFilter('all')
    })

    expect(result.current.todos).toHaveLength(2)
  })

  it('should persist todos to localStorage', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Persisted')
    })

    const stored = JSON.parse(localStorageMock.getItem('todolist-storage') || '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].text).toBe('Persisted')
  })
})

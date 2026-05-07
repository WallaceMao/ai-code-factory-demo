import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  labels: {
    editTitle: string;
    deleteTitle: string;
  };
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit, labels }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleSave() {
    onEdit(todo.id, editText);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="edit-input"
        />
      </li>
    );
  }

  return (
    <li className="todo-item">
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.text}
        </span>
      </label>
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="action-btn edit"
          title={labels.editTitle}
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="action-btn delete"
          title={labels.deleteTitle}
        >
          ×
        </button>
      </div>
    </li>
  );
}

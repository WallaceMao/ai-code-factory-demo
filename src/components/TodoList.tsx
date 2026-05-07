import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  labels: {
    emptyState: string;
    item: {
      editTitle: string;
      deleteTitle: string;
    };
  };
}

export default function TodoList({ todos, onToggle, onDelete, onEdit, labels }: Props) {
  if (todos.length === 0) {
    return <div className="empty-state">{labels.emptyState}</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          labels={labels.item}
        />
      ))}
    </ul>
  );
}

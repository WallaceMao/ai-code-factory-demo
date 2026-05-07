import { FilterType } from '../types/todo';

interface Props {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
  labels: {
    labels: Record<FilterType, string>;
    activeCount: (count: number) => string;
    clearCompleted: string;
  };
}

const filters: FilterType[] = ['all', 'active', 'completed'];

export default function TodoFilter({
  filter,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
  labels,
}: Props) {
  return (
    <div className="todo-filter">
      <span className="todo-count">{labels.activeCount(activeCount)}</span>
      <div className="filter-buttons">
        {filters.map(key => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`filter-btn ${filter === key ? 'active' : ''}`}
          >
            {labels.labels[key]}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button onClick={onClearCompleted} className="clear-btn">
          {labels.clearCompleted}
        </button>
      )}
    </div>
  );
}

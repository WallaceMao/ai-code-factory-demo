import { FilterType } from '../types/todo';

interface Props {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
];

export default function TodoFilter({
  filter,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="todo-filter">
      <span className="todo-count">{activeCount} 个待办</span>
      <div className="filter-buttons">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button onClick={onClearCompleted} className="clear-btn">
          清除已完成
        </button>
      )}
    </div>
  );
}

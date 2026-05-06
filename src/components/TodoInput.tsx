import { useState, FormEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onAdd(text);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="todo-input-wrapper">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="添加新任务..."
        className="todo-input"
      />
      <button type="submit" className="add-btn" disabled={!text.trim()}>
        添加
      </button>
    </form>
  );
}

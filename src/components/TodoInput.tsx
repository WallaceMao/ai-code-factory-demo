import { useState, FormEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
  labels: {
    placeholder: string;
    addButton: string;
  };
}

export default function TodoInput({ onAdd, labels }: Props) {
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
        placeholder={labels.placeholder}
        className="todo-input"
      />
      <button type="submit" className="add-btn" disabled={!text.trim()}>
        {labels.addButton}
      </button>
    </form>
  );
}

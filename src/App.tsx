import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { Language, languageNames, translations } from './i18n';
import './App.css';

function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const t = translations[language];
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📝 TodoList</h1>
        <div className="language-switch" aria-label={t.app.languageLabel}>
          {(Object.keys(languageNames) as Language[]).map(option => (
            <button
              key={option}
              type="button"
              className={`language-btn ${language === option ? 'active' : ''}`}
              onClick={() => setLanguage(option)}
              aria-pressed={language === option}
            >
              {languageNames[option]}
            </button>
          ))}
        </div>
      </header>
      <div className="todo-card">
        <TodoInput onAdd={addTodo} labels={t.input} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          labels={{
            emptyState: t.list.emptyState,
            item: t.item,
          }}
        />
        <TodoFilter
          filter={filter}
          onChange={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
          labels={t.filter}
        />
      </div>
    </div>
  );
}

export default App;

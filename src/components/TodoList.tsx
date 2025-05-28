import React from 'react';
import { useTodo } from '../contexts/TodoContext';
import Todo from './Todo';

const TodoList: React.FC = () => {
  const { todos, toggleTodo, deleteTodo } = useTodo();

  if (todos.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: '#666', 
        marginTop: '20px',
        fontSize: '16px'
      }}>
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList; 
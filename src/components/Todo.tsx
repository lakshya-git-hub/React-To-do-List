import React from 'react';
import { Todo as TodoType } from '../types/todo';

interface TodoProps {
  todo: TodoType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div 
      className="todo-item" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        margin: '10px 0',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ 
          marginRight: '10px',
          width: '18px',
          height: '18px',
          cursor: 'pointer'
        }}
      />
      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none',
        flex: 1,
        color: todo.completed ? '#888' : '#333',
        fontSize: '16px'
      }}>
        {todo.text}
      </span>
      <button 
        onClick={() => onDelete(todo.id)}
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff0000'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4444'}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo; 
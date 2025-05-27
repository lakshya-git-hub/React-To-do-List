import React from 'react';

interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div className="todo-item" style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        style={{ marginRight: '10px' }}
      />
      <span style={{ 
        textDecoration: completed ? 'line-through' : 'none',
        flex: 1
      }}>
        {text}
      </span>
      <button 
        onClick={() => onDelete(id)}
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo; 
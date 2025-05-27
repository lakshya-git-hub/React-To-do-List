import React from 'react';

interface TodoFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange, onSortChange }) => {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
};

export default TodoFilter; 
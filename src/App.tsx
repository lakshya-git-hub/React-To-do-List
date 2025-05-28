import React from 'react';
import { TodoProvider } from './contexts/TodoContext';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="App">
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px',
            fontSize: '2.5rem'
          }}>
            Todo List
          </h1>
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default App; 
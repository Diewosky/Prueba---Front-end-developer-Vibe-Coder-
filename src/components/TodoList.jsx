import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import { truncateText } from '../utils/helpers';
import Button from './Button';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const posts = await getPosts();
      setTodos(posts.slice(0, 10)); // Get first 10 posts
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error al cargar las tareas. Por favor, intente nuevamente.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Cargando tareas...</div>;
    }
    
    if (error) {
      return (
        <div className="error">
          <p>{error}</p>
          <Button 
            text="Intentar Nuevamente" 
            onClick={() => {
              setTodos([]);
              setLoading(true);
              setError(null);
              fetchTodos();
            }} 
          />
        </div>
      );
    }
    
    if (todos.length === 0) {
      return <div className="empty-state">No hay tareas disponibles.</div>;
    }

    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <h3>{todo.title}</h3>
            <p>{truncateText(todo.body, 80)}</p>
            <div className="todo-actions">
              <Button text="Ver" onClick={() => alert(`Ver tarea ${todo.id}`)} />
              <Button text="Eliminar" type="danger" onClick={() => alert(`Eliminar tarea ${todo.id}`)} />
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="todo-list">
      <h2>Lista de Tareas</h2>
      {renderContent()}
    </div>
  );
};

export default TodoList; 
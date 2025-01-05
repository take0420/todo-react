'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/todo';
import TodoList from '../../components/TodoList';
import AddForm from '../../components/AddForm';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  const updateTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleAddFormSubmit = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      isCompleted: false,
    };
    updateTodos([...todos, newTodo]);
  };

  const handleTodoCheckboxChange = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    updateTodos(updatedTodos);
  };

  const handleTodoDeleteClick = (id: number) => {
    const remainingTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(remainingTodos);
  };

  const handlePurgeClick = () => {
    const activeTodos = todos.filter((todo) => !todo.isCompleted);
    updateTodos(activeTodos);
  };

  return (
    <div className='container mx-auto max-w-lg p-4 bg-white shadow rounded-lg mt-8'>
      <h1 className='text-2xl font-bold border-b pb-2 flex justify-between items-center'>
        Todos
        <button
          onClick={handlePurgeClick}
          className='bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400'
        >
          Purge
        </button>
      </h1>
      <TodoList
        todos={todos}
        onDeleteClick={handleTodoDeleteClick}
        onCheckboxChange={handleTodoCheckboxChange}
      />
      <AddForm onSubmit={handleAddFormSubmit} />
    </div>
  );
}

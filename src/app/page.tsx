'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

const Todo = ({
  todo,
  onDeleteClick,
  onCheckboxChange,
}: {
  todo: Todo;
  onDeleteClick: (id: number) => void;
  onCheckboxChange: (id: number) => void;
}) => {
  return (
    <li className='flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-sm'>
      <label className='flex items-center'>
        <input
          type='checkbox'
          className='mr-2'
          checked={todo.isCompleted}
          onChange={() => onCheckboxChange(todo.id)}
        />
        <span className={todo.isCompleted ? 'line-through text-gray-400' : ''}>
          {todo.title}
        </span>
      </label>
      <button
        onClick={() => onDeleteClick(todo.id)}
        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
      >
        Del
      </button>
    </li>
  );
};

const AddForm = ({ onSubmit }: { onSubmit: (title: string) => void }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 mt-4'>
      <input
        type='text'
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
        className='flex-1 p-2 border border-gray-300 rounded shadow-sm'
        placeholder='Add a new todo'
      />
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Add
      </button>
    </form>
  );
};

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
      <ul className='mt-4'>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDeleteClick={handleTodoDeleteClick}
            onCheckboxChange={handleTodoCheckboxChange}
          />
        ))}
      </ul>
      <AddForm onSubmit={handleAddFormSubmit} />
    </div>
  );
}

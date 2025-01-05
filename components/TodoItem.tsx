'use client';

import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onDeleteClick: (id: number) => void;
  onCheckboxChange: (id: number) => void;
}

const TodoItem = ({ todo, onDeleteClick, onCheckboxChange }: TodoItemProps) => {
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

export default TodoItem;

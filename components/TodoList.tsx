'use client';

import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onDeleteClick: (id: number) => void;
  onCheckboxChange: (id: number) => void;
}

const TodoList = ({
  todos,
  onDeleteClick,
  onCheckboxChange,
}: TodoListProps) => {
  return (
    <ul className='mt-4'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteClick={onDeleteClick}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </ul>
  );
};

export default TodoList;

'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AddFormProps {
  onSubmit: (title: string) => void;
}

const AddForm = ({ onSubmit }: AddFormProps) => {
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

export default AddForm;

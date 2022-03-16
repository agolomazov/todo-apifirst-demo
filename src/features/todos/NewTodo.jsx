import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './NewTodo.module.css';

import { createTodo } from './ducks';

export const NewTodo = () => {
  const dispatch = useDispatch();
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  const clearForm = () => {
    setTodoTitle('');
    setTodoDescription('');
  }

  const handlerCreate = (ev) => {
    ev.preventDefault();
    
    if ([
      !todoTitle.trim(),
      !todoDescription.trim()
    ].some(Boolean)) {
      return;
    }

    dispatch(
      createTodo({
        title: todoTitle,
        description: todoDescription,
        completed: false
      })
    );

    clearForm();
  }
  return (
    <>
      <div className={styles['form-control']}>
        <input
          type="text"
          value={todoTitle}
          placeholder="Укажите название задачи"
          onChange={(ev) => setTodoTitle(ev.target.value)}
        />
      </div>
      <div className={styles['form-control']}>
        <textarea
          value={todoDescription}
          placeholder="Укажите описание задачи"
          onChange={(ev) => setTodoDescription(ev.target.value)}
        ></textarea>
      </div>
      <button className="btn" onClick={handlerCreate}>
        Add todo
      </button>
    </>
  );
}
import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './Todo.module.css';

import { removeTodo, toggleTodo } from './ducks';

export const Todo = ({ todo, onToggle }) => {
  const dispatch = useDispatch();
  const {title, description, completed} = todo;

  const handleRemove = () => {
    dispatch(removeTodo(todo));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo))
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.remove}>
        <button onClick={handleRemove}>Remove TODO</button>
      </p>
    </div>
  );
}
import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './Todo.module.css';

import { removeTodo } from './ducks';

export const Todo = ({ todo, onToggle }) => {
  const dispatch = useDispatch();
  const {title, description, completed} = todo;

  const handlerRemove = () => {
    dispatch(removeTodo(todo));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.remove}>
        <button onClick={handlerRemove}>Remove TODO</button>
      </p>
    </div>
  );
}
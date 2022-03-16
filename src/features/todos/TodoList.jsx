import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './TodoList.module.css';

import { Todo } from './Todo';
import { loadTodos, todoListSelector } from './ducks';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todoListSelector.selectAll);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <div className={style['todo-list']}>
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
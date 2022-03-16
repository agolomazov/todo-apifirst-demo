import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { todoAPI } from './api';

const todoAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
});

export const loadTodos = createAsyncThunk(
  '@@todos/load-todos',
  async (_, { rejectWithValue }) => {
    try {
      return await todoAPI.getTodos();
    } catch (error) {
      return rejectWithValue('Возникли проблемы при получении списка задач');
    }
  }
);

export const createTodo = createAsyncThunk(
  '@@todos/create-todo',
  async (newTodo, { rejectWithValue }) => {
    try {
      return await todoAPI.createTodo(newTodo);
    } catch (error) {
      return rejectWithValue('Ошибка при создании задачи');
    }
  }
);

export const removeTodo = createAsyncThunk(
  '@@todos/remove-todo',
  async (todo, { rejectWithValue }) => {
    try {
      return await todoAPI.removeTodo(todo);
    } catch (error) {
      return rejectWithValue('Ошибка при удалении задачи');
    }
  }
);

export const toggleTodo = createAsyncThunk(
  '@@todos/toggle-todo',
  async (todo, { rejectWithValue }) => {
    try {
      const newTodo = {
        ...todo,
        completed: !todo.completed
      };
      await todoAPI.updateTodo(newTodo);
      return newTodo;
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении задачи');
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: todoAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.fulfilled, (state, action) => {
        todoAdapter.addMany(state, action.payload);
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        todoAdapter.addOne(state, action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        todoAdapter.removeOne(state, action.payload.id);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        todoAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            completed: action.payload.completed
          }
        });
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = 'idle';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = 'loading';
          state.error = null;
        }
      );
  },
});

export const todoListSelector = todoAdapter.getSelectors(state => state.todos);
export const { reducer } = todosSlice;
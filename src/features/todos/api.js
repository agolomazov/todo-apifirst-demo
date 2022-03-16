import { BaseAPI } from '../../api';

class TodoAPI extends BaseAPI {
  async getTodos() {
    try {
      const todosResponse = await this.get('todos');
      return todosResponse.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createTodo(todo) {
    try {
      const todosResponse = await this.post('todos', todo);
      return todosResponse.data;
    } catch (error) {
      console.log(error);
    }
  }

  async removeTodo(todo) {
    try {
      await this.remove(`todos/${todo.id}`);
      return todo;
    } catch (error) {
      console.log(error);
    }
  }
}

export const todoAPI = new TodoAPI();
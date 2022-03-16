import { TodoList, NewTodo } from './features/todos';

function App() {

  return (
    <div className="App">
      <NewTodo />
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;

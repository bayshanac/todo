import { Provider } from "jotai";

import Todo from "./components/Todo/TodoApp";

function App() {
  return (
    <Provider>
      <Todo />
    </Provider>
  );
}

export default App;

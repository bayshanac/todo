import { Provider } from "jotai";

import Todo from "./components/Todo";

function App() {
  return (
    <Provider>
      <Todo />
    </Provider>
  );
}

export default App;

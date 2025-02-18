import { Provider } from "jotai";
import { useRoutes } from "react-router";

import { ProtectedRoute } from "@components/ProtectedRoute/ProtectedRoute";
import LoginPage from "@pages/LoginPage";
import TodoPage from "@pages/TodoPage";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <TodoPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return <Provider>{routes}</Provider>;
}

export default App;

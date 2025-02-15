import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="font-bold text-2xl">ToDo App</p>
    </div>
  </StrictMode>
);

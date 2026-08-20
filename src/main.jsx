import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";

function AppWithLenis() {
  useLenis();
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppWithLenis />
  </BrowserRouter>,
);

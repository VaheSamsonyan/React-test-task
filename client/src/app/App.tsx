import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@shared/routes/authroutes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

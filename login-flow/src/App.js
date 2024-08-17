import logo from "./logo.svg";
import "./App.css";
import MainRoutes from "./AllRoutes/MainRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div>
      <MainRoutes />
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;

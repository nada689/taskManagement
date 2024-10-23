import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Nav";
import "./App.css";
import SignUp from "./signUp";

function App() {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;


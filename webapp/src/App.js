import Login from "./View/Login_view.js";
import Home from "./View/Home_view.js";
import SignUp from "./View/Signup_view.js";
import Form from "./View/Upload_form.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/uploadform" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

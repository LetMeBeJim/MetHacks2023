import React from "react";
import Navbar from './components/Navbar';
import AnimatedRoutes from "./components/AnimatedRoutes";
import { BrowserRouter as Router} from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AnimatedRoutes></AnimatedRoutes>
      </Router>
    </div>
  );
}
export default App;

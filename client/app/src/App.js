import React from "react";
import Navbar from './components/Navbar';
import AnimatedRoutes from "./components/AnimatedRoutes";
import { BrowserRouter as Router} from 'react-router-dom';
import "./App.css";
import image from "./img/veggie_bg.png"; 

function App() {
  return (
    <div className="App h-[100vh] w-[100vw]" style={{ backgroundImage:`url(${image})`,backgroundSize:"contain"}}>
      <Router>
        <Navbar />
        <AnimatedRoutes></AnimatedRoutes>
      </Router>
    </div>
  );
}
export default App;

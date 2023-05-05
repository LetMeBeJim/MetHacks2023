import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage"; 
import Test from "./components/Test";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css";

function App() {
  return (
      <>
        <Router className="App">
          <Navbar />
        
          <Routes>
                <Route exact path="/test" component={Test}/>
                <Route exact path="/" component={HomePage}/>
            </Routes >
        </Router>
        
      </>
  );
}
export default App;

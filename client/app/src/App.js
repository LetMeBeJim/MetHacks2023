import React from "react";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Recipe from './pages/Recipe';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/recipe" element={<Recipe />} />
          <Route exact path="/about" element={<Recipe />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

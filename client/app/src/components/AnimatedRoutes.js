import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import Recipe from '../pages/Recipe'
import RecipeContainer from '../pages/RecipeContainer'
import About from '../pages/About'

import {AnimatePresence} from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/recipe" element={<Recipe />} />
            <Route path="/recipe/:id" element={<RecipeContainer />}/>
            <Route exact path="/about" element={<About />} />
        </Routes> 
    </AnimatePresence>
  )
}

export default AnimatedRoutes

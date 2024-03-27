import React from "react";
import { Route, Routes } from "react-router-dom";


import MainLayout from "./layouts/MainLayout";
import Movies from "./components/Movies";
//  import "./App.css";
import CinemaHalls from "./components/CinemaHalls";
import MovieCard from "./components/MovieCard";
import Home from "./pages/Home";








function App() {
  
  
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<MainLayout/>}>
      <Route path="/" element={<Home/>}></Route>
      </Route>
     </Routes>
    </div>
  );
}

export default App;

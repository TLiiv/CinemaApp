import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import MainNav from "./components/MainNav";
import MainLayout from "./layouts/MainLayout";
import Trailer from "./components/Trailer";
import Footer from "./components/Footer";
import Booking from "./pages/Booking";

import "./App.css";



function App() {

  
  return (
    <div className="App">
      <MainNav />
     <Routes>
      <Route path="/" element={<MainLayout/>}>
      <Route path="/" element={<Home/>}></Route>
      <Route path="Booking" element={<Booking />}></Route>
      <Route path="Trailer/:ytTrailerId" element={<Trailer/>}></Route>
      </Route>
     </Routes>
     {/* <Footer /> */}
    </div>
  );
}

export default App;

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
         <div className="App">
      <MainNav />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* Default route for / */}
          <Route path="booking" element={<Booking />} />
        </Route>
        <Route path="Trailer/:ytTrailerId" element={<Trailer />} />
      </Routes>
      {/* <Footer /> */}
    </div>
    </div>
  );
}

export default App;

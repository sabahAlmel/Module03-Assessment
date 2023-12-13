import "./App.css";

import React from "react";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Add from "./components/Dashboard/Dashboard";
import Update from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/add" element={<Add />} />
    </Routes>
  );
}

export default App;

import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './views/Home'
import MainPage from './views/Main'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
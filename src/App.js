import React, { useState, useEffect } from "react";
import "./App.css";
// import { API_URL } from "./constants";
// import axios from "axios";
import AllCharacters from "./components/allCharacters";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/home";
import CreateCharacter from "./components/createCharacter";
import OneCharacter from "./components/oneCharacter";

function App() {
    return (
        <div className="App">
            <h1>This is an MCU app, see what year each hero debuted.</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/mcu">See All Characters</Link>
                    </li>
                    <li>
                        <Link to="/mcu/create">Create Character</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mcu" element={<AllCharacters />} />
                <Route path="/mcu/create" element={<CreateCharacter />} />
                <Route path="/mcu/:name" element={<OneCharacter />} />
            </Routes>
        </div>
    );
}

export default App;

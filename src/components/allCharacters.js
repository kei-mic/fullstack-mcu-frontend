import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";

function AllCharacters() {
    const [serverData, setServerData] = useState([]);

    // how we connect to our backend server
    useEffect(() => {
        axios
            .get(`${API_URL}/allCharacters`)
            // allCharacters because thats the route on backend
            .then(async (res) => {
                console.log(res.data.payload); // show in console
                setServerData(res.data.payload); // set to variable declared
            })
            .catch((e) => console.log(e)); // to see any errors
    }, []);

    return (
        <div className="App">
            <h2>This is allCharacters.js</h2>
            {serverData.length > 0 ? (
                serverData.map((character) => {
                    return (
                        <li key={character._id}>
                            <Link
                                to={`/mcu/${character.name}`}
                                // use url from frontend in app.js
                            >
                                {character.name}
                            </Link>
                        </li>
                    );
                })
            ) : (
                <h1>loading...</h1>
            )}
        </div>
    );
}
export default AllCharacters;

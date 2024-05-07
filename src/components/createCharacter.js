import React, { useState } from "react";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";

function CreateCharacter() {
    const [character, setCharacter] = useState({
        name: "",
        debutFilm: "",
        debutYear: 0,
    });

    const navigate = useNavigate();

    async function postCharacter() {
        fetch(`${API_URL}/createOneMcu`, {
            // where the character obj gets posted to the backend
            method: "post",
            body: JSON.stringify(character),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then(async (res) => {
                let serverResponse = await res.json();
                console.log(serverResponse); // check response
                navigate(`/mcu/${serverResponse.payload.name}`); // navigate to character's page
            })
            .catch((e) => console.log(e));

        // after adding reset character obj
        setCharacter({
            name: "",
            debutFilm: "",
            debutYear: 0,
        });
    }

    function handleOnSubmit(event) {
        event.preventDefault(); //prevent form from loading new page

        postCharacter(); //call async function to add character to backend
    }

    return (
        <div>
            <h2>Create Character</h2>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <label>Name</label> &nbsp;
                <input
                    value={character.name}
                    onChange={(e) =>
                        setCharacter({ ...character, name: e.target.value })
                    }
                    // use the spread operator so it keeps the other values but each input updates it's respective property
                />
                <br />
                <br />
                <label>DebutFilm</label> &nbsp;
                <input
                    value={character.debutFilm}
                    onChange={(e) =>
                        setCharacter({
                            ...character,
                            debutFilm: e.target.value,
                        })
                    }
                />
                <br />
                <br />
                <label>DebutYear</label> &nbsp;
                <input
                    value={character.debutYear}
                    onChange={(e) =>
                        setCharacter({
                            ...character,
                            debutYear: e.target.value,
                        })
                    }
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
export default CreateCharacter;

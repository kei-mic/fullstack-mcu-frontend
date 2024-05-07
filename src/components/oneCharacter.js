import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";

function OneCharacter() {
    const { name } = useParams();
    const [character, setCharacter] = useState({
        debutFilm: "",
        debutYear: "",
    });
    const [isEditing, setIsEditing] = useState(false); //track if editing or not
    const navigate = useNavigate();

    // triggered when name is changed
    useEffect(() => {
        fetch(`${API_URL}/oneMcu/${name}`, {
            //oneMcu because thats what we used in backend mcuRouter.js
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then(async (res) => {
            let result = await res.json();
            setCharacter(result.payload); //set output
        });
    }, [name, isEditing]);
    // add isEditing so that the update shows right away

    // to edit character
    function toggleEditing() {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    //allows user to type in text boxes
    function updateCharacter({ target }) {
        setCharacter((prevState) => ({
            ...prevState,
            [target.name]: target.value, //dynamically inject property
        }));
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        console.log("Submitted!");
        console.log(character._id);

        fetch(`${API_URL}/updateOneMcu/${character._id}`, {
            method: "put",
            body: JSON.stringify(character),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then(() => {
            setIsEditing(false);
        });
    }
    function handleDelete() {
        fetch(`${API_URL}/deleteOneMcu/${character._id}`, {
            method: "delete",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then(() => {
            navigate(`/mcu`);
        });
    }

    return (
        <div>
            <h2>{character.name}</h2>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <p>
                    The character <strong>{character.name}</strong> debuted in
                    the film
                    {isEditing ? (
                        <input
                            type="text"
                            name="debutFilm"
                            value={character.debutFilm}
                            onChange={updateCharacter}
                        />
                    ) : (
                        <strong> {character.debutFilm} </strong>
                    )}
                    released in
                    {isEditing ? (
                        <input
                            type="text"
                            name="debutYear"
                            value={character.debutYear}
                            onChange={updateCharacter}
                        />
                    ) : (
                        <strong> {character.debutYear} </strong>
                    )}
                </p>
                {isEditing ? (
                    <button type="submit">Save Changes</button>
                ) : (
                    <br />
                )}
            </form>

            <br />
            {!isEditing ? (
                <button onClick={toggleEditing}>Edit Character Details</button>
            ) : (
                <br />
            )}
            <br />
            <br />
            <button onClick={handleDelete}>Delete this character</button>
        </div>
    );
}
export default OneCharacter;

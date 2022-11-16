import React from 'react'
import {useNavigate} from 'react-router-dom';

function StartGameForm() {
    const navigate = useNavigate();
    const startGame = () =>{
        navigate("/game");
    }
    return (
        <div style={{color:"white", backgroundColor:"red"}}>

            <label htmlFor="number_players">Choose number of players:</label>
            <select id="number_players">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">2</option>
                <option value="4">3</option>
            </select>
            <p onClick={startGame}>
                Start
            </p>
        </div>
    )
}

export default StartGameForm
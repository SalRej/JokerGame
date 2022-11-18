import React , {useRef} from 'react'
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../redux/hooks';
import {setNumberOfPlayers} from '../redux/reducers/players'; 
function StartGameForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const numberOfPlayersInput = useRef<HTMLSelectElement>(null);

    const startGame = () =>{

        if(numberOfPlayersInput.current!=null){
            const numberOfPlayers:number = Number(numberOfPlayersInput.current.value);
            dispatch(setNumberOfPlayers(numberOfPlayers));
            navigate("/game");
        }
    }
    return (
        <div className='form_test'>

            <label htmlFor="number_players">Choose number of players:</label>
            <select ref={numberOfPlayersInput} id="number_players">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button onClick={startGame}>
                Start
            </button>
        </div>
    )
}

export default StartGameForm
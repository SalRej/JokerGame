import React , { useEffect , useState , useRef}from 'react'
import KingWithMovingEyes from '../components/KingWithMovingEyes';
import FallingCards from '../components/FallingCards';
const Main:React.FC = ()=>{

    return (
    <div className='background'>
        <h1>Joker Game</h1>
        <button>Play now</button>
        <FallingCards numberCards={100}/>
        <div className='king_holder left'>
            <KingWithMovingEyes
                position = {"leftKing"}
            />
        </div>
        <div className='king_holder right'>
            <KingWithMovingEyes
                position = {"rightKing"}
            />
        </div>
    </div>
    )
}

export default Main
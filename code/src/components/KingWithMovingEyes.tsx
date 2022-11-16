import React from 'react'

const KingWithMovingEyes:React.FC = () =>{


  return (
    <div>
        <img src='cards/king.png'></img>
        <img className = "left_eye" src='cards/eye.png'></img>
        <img className = "right_eye" src='cards/eye.png'></img>
    </div>
  )
}

export default KingWithMovingEyes
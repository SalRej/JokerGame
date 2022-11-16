import React ,{useEffect , useRef} from 'react'
interface Props{
    position:string
}
function KingWithMovingEyes ({position}:Props){
    
    const leftEye = useRef<HTMLImageElement>(null);
    const rightEye = useRef<HTMLImageElement>(null);

    const rotateEyes = (mouseX:number,mouseY:number) =>{
        if(leftEye.current!=null && rightEye.current!=null){

            const rect1 = leftEye.current.getBoundingClientRect();
            let angleLeftEye:number = Math.atan2(rect1.y - mouseY, rect1.x - mouseX) * 180 / Math.PI;
            angleLeftEye+=180;
            leftEye.current.style.transform = `rotate(${angleLeftEye}deg)`;

            const rect2 = rightEye.current.getBoundingClientRect();
            let angleRightEye:number = Math.atan2(rect2.y - mouseY, rect2.x - mouseX) * 180 / Math.PI;
            angleRightEye+=180;
            rightEye.current.style.transform = `rotate(${angleRightEye}deg)`;
        }
    }

    useEffect(()=>{
        window.addEventListener('mousemove',(e)=>{
            rotateEyes(e.clientX,e.clientY);
        })
    },[])

    return (
        <div>
            <img src='cards/king.png' className={position}></img>
            <img className = "left_eye" src='cards/eye.png' ref={leftEye}></img>
            <img className = "right_eye" src='cards/eye.png' ref={rightEye}></img>
        </div>
    )
}

export default KingWithMovingEyes
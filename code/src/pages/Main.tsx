import React , { useEffect , useState , useRef}from 'react'
import KingWithMovingEyes from '../components/KingWithMovingEyes';
const Main:React.FC = ()=>{

    interface Cordinates{
        x:number,
        y:number
    }

    const [cardImageUrls,setCardImageUrls] = useState<string[]>([]);
    const [isLoaded,setIsLoaded] = useState<boolean>(false);
    const opacityInterval = useRef<null|number>(null);
    const mouseCordinates = useRef<Cordinates>({x:0,y:0});

    const leftKingLeftEye = useRef<HTMLImageElement>(null);
    const leftKingRightEye = useRef<HTMLImageElement>(null);
    const rightKingLeftEye = useRef<HTMLImageElement>(null);
    const rightKingRightEye = useRef<HTMLImageElement>(null);

    useEffect(()=>{

        //load n random card images
        const urls:string[] = [];
        const types:string[] = ["Spades","Hearts","Clubs","Ace"];
        for(let i = 0; i <100;i++){

            const randomTypeNumber:number = Math.floor(Math.random()*3);
            const currentType:string = types[randomTypeNumber];

            const randomCardNumber:number = Math.floor(Math.random()*12) + 1;
            urls.push(`cards/${currentType}${randomCardNumber}.png`);
        }
        setCardImageUrls(urls);
    },[])

    const randomizeCards = () =>{
        const cardImages = document.querySelectorAll<HTMLElement>('.falling_card');
        cardImages.forEach(image=>{
            image.style.left=(Math.random()*window.innerWidth).toString() + 'px';
            image.style.top=( 0 - (Math.random()*window.innerHeight)).toString() + 'px';
            image.style.height=((Math.random()*4)+1).toString() + 'em';
        })

        if(opacityInterval.current!=null){
            clearInterval(opacityInterval.current);
        }

        opacityInterval.current = setInterval(()=>{
            changeOpacity(cardImages)
        },10);
    }

    const changeOpacity = (cardImages:NodeListOf<HTMLElement>)=>{
        const x:number = mouseCordinates.current.x;
        const y:number = mouseCordinates.current.y;

        cardImages.forEach(image=>{
            var rect = image.getBoundingClientRect();

            const imageX:number = rect.x;
            const imageY:number = rect.y;
            const dist = Math.sqrt(Math.pow(x-imageX,2)+Math.pow(y-imageY,2));

            if(dist<window.innerWidth/5){
                image.style.opacity="1";
            }else{
                image.style.opacity="0.5"
            }
        })
    }

    const rotateKingsEyes = () =>{
        if(leftKingLeftEye.current!=null && leftKingRightEye.current!=null
            && rightKingLeftEye.current!=null && rightKingRightEye.current!=null){

            const rect1 = leftKingLeftEye.current.getBoundingClientRect();
            let angleLeftKingLeftEye:number = Math.atan2(rect1.y - mouseCordinates.current.y, rect1.x - mouseCordinates.current.x) * 180 / Math.PI;
            leftKingLeftEye.current.style.transform = `rotate(${angleLeftKingLeftEye}deg)`;

            const rect2 = leftKingLeftEye.current.getBoundingClientRect();
            const angleLeftKingRightEye:number = Math.atan2(rect2.y - mouseCordinates.current.y, rect2.x - mouseCordinates.current.x) * 180 / Math.PI;
            leftKingRightEye.current.style.transform = `rotate(${angleLeftKingRightEye}deg)`;

            const rect3 = leftKingLeftEye.current.getBoundingClientRect();
            const angleRightKingLeftEye:number = Math.atan2(rect3.y - mouseCordinates.current.y, rect3.x - mouseCordinates.current.x) * 180 / Math.PI;
            leftKingLeftEye.current.style.transform = `rotate(${angleRightKingLeftEye}deg)`;

            const rect4 = leftKingLeftEye.current.getBoundingClientRect();
            const angleRightKingRighttEye:number = Math.atan2(rect4.y - mouseCordinates.current.y, rect4.x - mouseCordinates.current.x) * 180 / Math.PI;
            leftKingLeftEye.current.style.transform = `rotate(${angleRightKingRighttEye}deg)`;
        }
    }
    useEffect(()=>{ 

        randomizeCards();
        window.addEventListener('resize',()=>{
            randomizeCards();
        })

        window.addEventListener("mousemove",(event)=>{
            mouseCordinates.current.x = event.clientX;
            mouseCordinates.current.y = event.clientY;

            rotateKingsEyes();
        })

        setIsLoaded(true);
    },[cardImageUrls]);

    useEffect(()=>{
        
    },[isLoaded]);

    return (
    <div className='background'>
        {
            isLoaded &&
            cardImageUrls.map((url,index)=>{
                return(<img className="falling_card" src={url} key={index}></img>)
            })
        }
        <h1>Joker Game</h1>
        <button>Play now</button>
        <div className='king_holder left'>
            <KingWithMovingEyes />
        </div>
        <div className='king_holder right'>
            <KingWithMovingEyes />
        </div>
    </div>
    )
}

export default Main
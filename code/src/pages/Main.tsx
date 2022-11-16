import React , { useEffect , useState , useRef}from 'react'

const Main:React.FC = ()=>{

    interface Cordinates{
        x:number,
        y:number
    }

    const [cardImageUrls,setCardImageUrls] = useState<string[]>([]);
    const [isLoaded,setIsLoaded] = useState<boolean>(false);
    const opacityInterval = useRef<null|number>(null);
    const mouseCordinates = useRef<Cordinates>({x:0,y:0});

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
    useEffect(()=>{ 

        randomizeCards();
        window.addEventListener('resize',()=>{
            randomizeCards();
        })

        window.addEventListener("mousemove",(event)=>{
            mouseCordinates.current.x = event.clientX;
            mouseCordinates.current.y = event.clientY;

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
            <img src='cards/king.png'></img>
            <img className = "left_eye" src='cards/eye.png'></img>
            <img className = "right_eye" src='cards/eye.png'></img>
        </div>
        <div className='king_holder right'>
            <img src='cards/king.png'></img>
            <img className = "left_eye" src='cards/eye.png'></img>
            <img className = "right_eye" src='cards/eye.png'></img>
        </div>
    </div>
    )
}

export default Main
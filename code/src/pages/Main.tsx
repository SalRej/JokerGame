import React , { useEffect , useState}from 'react'

const Main:React.FC = ()=>{

    const [cardImageUrls,setCardImageUrls] = useState<string[]>([]);
    const [isLoaded,setIsLoaded] = useState<boolean>(false);

    useEffect(()=>{

        //load n random card images
        const urls:string[] = [];
        const types:string[] = ["Spades","Hearts","Clubs","Ace"];
        for(let i = 0; i <60;i++){

            const randomTypeNumber:number = Math.floor(Math.random()*3);
            const currentType:string = types[randomTypeNumber];

            const randomCardNumber:number = Math.floor(Math.random()*12) + 1;
            urls.push(`cards/${currentType}${randomCardNumber}.png`);
        }
        setCardImageUrls(urls);
    },[])

    useEffect(()=>{

        const cardImages = document.querySelectorAll<HTMLElement>('.falling_card');
        cardImages.forEach(image=>{

            image.style.left=(Math.random()*window.innerWidth).toString() + 'px';
            image.style.top=(0 - (Math.random()*window.innerHeight)).toString() + 'px';
            image.style.height=((Math.random()*4)+1).toString() + 'em';
        })

        setIsLoaded(true);
    },[cardImageUrls]);

    useEffect(()=>{
        
    },[isLoaded]);

    return (
    <div className='background'>
        {
            isLoaded &&
            cardImageUrls.map(url=>{
                return(<img className="falling_card" src={url}></img>)
            })
        }
    </div>
    )
}

export default Main
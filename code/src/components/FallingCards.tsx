import React, { useRef, useState, useEffect } from "react";
interface Cordinates {
  x: number;
  y: number;
}
interface Props {
  numberCards: number;
}
function FallingCards({ numberCards }: Props) {
  const [cardImageUrls, setCardImageUrls] = useState<string[]>([]);
  const opacityInterval = useRef<null | number>(null);
  const mouseCordinates = useRef<Cordinates>({ x: 0, y: 0 });

  useEffect(() => {
    //load n random card images
    const urls: string[] = [];
    const types: string[] = ["Spades", "Hearts", "Clubs", "Ace"];
    for (let i = 0; i < numberCards; i++) {
      const randomTypeNumber: number = Math.floor(Math.random() * 3);
      const currentType: string = types[randomTypeNumber];

      const randomCardNumber: number = Math.floor(Math.random() * 12) + 1;
      urls.push(`cards/${currentType}${randomCardNumber}.png`);
    }
    setCardImageUrls(urls);
  }, []);

  const randomizeCards = () => {
    const cardImages = document.querySelectorAll<HTMLElement>(".falling_card");
    cardImages.forEach((image) => {
      image.style.left = (Math.random() * window.innerWidth).toString() + "px";
      image.style.top =
        (0 - Math.random() * window.innerHeight).toString() + "px";
      image.style.height = (Math.random() * 4 + 1).toString() + "em";
    });

    if (opacityInterval.current != null) {
      clearInterval(opacityInterval.current);
    }

    opacityInterval.current = setInterval(() => {
      changeOpacity(cardImages);
    }, 10);
  };

  useEffect(() => {
    randomizeCards();
    window.addEventListener("resize", () => {
      randomizeCards();
    });

    window.addEventListener("mousemove", (event) => {
      mouseCordinates.current.x = event.clientX;
      mouseCordinates.current.y = event.clientY;
    });
  }, [cardImageUrls]);

  const changeOpacity = (cardImages: NodeListOf<HTMLElement>) => {
    const x: number = mouseCordinates.current.x;
    const y: number = mouseCordinates.current.y;

    cardImages.forEach((image) => {
      const rect = image.getBoundingClientRect();

      const imageX: number = rect.x;
      const imageY: number = rect.y;
      const dist = Math.sqrt(Math.pow(x - imageX, 2) + Math.pow(y - imageY, 2));

      if (dist < window.innerWidth / 5) {
        image.style.opacity = "1";
      } else {
        image.style.opacity = "0.5";
      }
    });
  };

  return (
    <React.Fragment>
      {cardImageUrls.map((url, index) => {
        return (
          <img
            alt="falling_card"
            className="falling_card"
            src={url}
            key={index}
          ></img>
        );
      })}
    </React.Fragment>
  );
}

export default FallingCards;

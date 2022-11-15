import {useAppSelector} from './redux/hooks';
import {useAppDispatch} from './redux/hooks';
import {loadCards} from './redux/reducers/desk';
import {useEffect} from 'react';
function App() {

  const {desk}  = useAppSelector(state=>state);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(loadCards());
  },[]);

  return (
    <div className="App">
      {
        desk.map((card)=>{
          return (
            <div>
              <p>{card.value}</p>
              <img src={card.imgUrl}></img>
            </div>
          )
        })
      }
    </div>
  )
}

export default App

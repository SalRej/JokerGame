import {useAppDispatch} from './redux/hooks';
import {loadCards,shuffleDeck} from './redux/reducers/desk';
import {useEffect} from 'react';
import { Routes , Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Game from './pages/Game';
function App() {

  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(loadCards());
    dispatch(shuffleDeck());
  },[]);

  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Main />}/>
        <Route path="/game" element={<Game />}/>
      </Routes>
    </div>
  )
}

export default App

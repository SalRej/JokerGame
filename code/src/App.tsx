import {useAppDispatch} from './redux/hooks';
import {loadCards,shuffleDeck} from './redux/reducers/deck';
import { resetPlayers } from './redux/reducers/players';
import {useEffect} from 'react';
import { Routes , Route , useLocation } from "react-router-dom";
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Game from './pages/Game';
function App() {

  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(()=>{
    dispatch(loadCards());
    dispatch(shuffleDeck());
  },[]);

  useEffect(()=>{
    if(location.pathname!='/game'){
      dispatch(resetPlayers());
    }
  },[location.pathname])
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

import {useAppSelector} from './redux/hooks';
import {useAppDispatch} from './redux/hooks';
import {loadCards} from './redux/reducers/desk';
import {useEffect} from 'react';
function App() {

  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(loadCards());
  },[]);

  return (
    <div className="App">

    </div>
  )
}

export default App

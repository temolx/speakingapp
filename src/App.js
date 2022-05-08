import './App.css';
import SpeakingGame from './Components/SpeakingGame';
import Landing from './Components/Landing';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/game' element={<SpeakingGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

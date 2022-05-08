import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import timer from '../images/timer.png'

function Landing() {

    const navigate = useNavigate();

    const[languages, setLanguages] = useState('');
    const [userInput, setUserInput] = useState({
        timer: 50,
        selectedLanguage: 'en',
        wordCount: 1
    });

    useEffect(() => {
        axios.get('https://random-word-api.herokuapp.com/languages')
            .then((res) => {
                setLanguages(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const handleNavigation = () => {
        navigate('/game', { state: {
            timer: userInput.timer,
            selectedLanguage: userInput.selectedLanguage,
            wordCount: userInput.wordCount
        }})
    }

  return (
    <div className='LandingPage'>
        <div className="LandingPage-container">
            <div className="detailsOne">
                <h1>Public Speaking Game</h1>

                <label htmlFor="timer"><img src={timer} alt="timer" /></label>
                <input type="range" name='timer' onChange={(e) => setUserInput({...userInput, timer: e.target.value})} min="15" max="90" defaultValue="50" />
                <label htmlFor="timer">{userInput.timer}s</label>
            </div>
            
            <div className="detailsTwo">
                <div className="dropSelect">
                    <h3>Word Quantity</h3>
                    <select onChange={(e) => setUserInput({...userInput, wordCount: e.target.value})}>
                        <option value="" disabled defaultValue>Words</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <button onClick={handleNavigation}>Start Training</button>
            </div>
        </div>
    </div>
  )
}

export default Landing
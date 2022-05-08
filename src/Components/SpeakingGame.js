import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import Timer from './Timer';
import checkbox from '../images/checkmark.png'
import replay from '../images/replay.png'
import home from '../images/home.png'

function SpeakingGame() {

    const location = useLocation();
    const navigate = useNavigate();

    const[words, setWords] = useState([]);
    const[helpers, setHelpers] = useState({
        content: [],
        visibility: [false, false, false, false, false]
    });

    let[helperIndex, setHelperIndex] = useState(-1);
    const[changeIndicator, setChangeIndicator] = useState(false)

    const[timerValue, setTimerValue] = useState(location.state.timer);
    const[displayGame, setDisplayGame] = useState(false);
    const[showRepeat, setShowRepeat] = useState(false);

    let intervalLength = location.state.timer * 150; // 150 is to ratio the total time with helpers appearing on screen

    useEffect(() => {
        if (words.length === 0) {
            axios.get(`https://random-word-api.herokuapp.com/word?number=${location.state.wordCount}`)
                .then((res) => {
                    setWords(res.data)
                    // console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                }) 
            }
        
            axios.get('https://random-word-api.herokuapp.com/word?number=5')
                .then((res) => {
                    setHelpers({
                        ...helpers,
                        content: res.data
                    })
                }).then((err) => {
                    console.log(err)
                })

            handleDisplay()
    }, [changeIndicator])

    const handleDisplay = () => {
        console.log(helperIndex)
        console.log(helpers.visibility)
        setTimeout(() => {
            setDisplayGame(true)
        }, 3000)

        setTimeout(() => {
            setShowRepeat(true)
        }, location.state.timer * 1000 + 3000) // adding 3000 because "Ready" screen lasts for 3 secs and therefore, delays everything for 3 secs.

        setInterval(() => {
            if (helperIndex < 5) {
                helpers.visibility[helperIndex] = true
                setHelperIndex(helperIndex++)
                // console.log(helperIndex)
            }
        }, intervalLength)
    }


    const handleRepeat = () => {
        setShowRepeat(false)
        setDisplayGame(false)

        setHelpers({
            ...helpers,
            visibility: [false, false, false, false, false]
        });
        setHelperIndex(-1)
        setChangeIndicator(!changeIndicator)

        handleDisplay()
    }

    const handleHome = () => {
        navigate('/')
    }


  return (
    <div className='SpeakingGame'>
        
        <div className="game-words">
            {words && words.map((word, index) => (
                <div className="randomWords">
                    { index + 1 === words.length ? <h1>{ word }</h1> : <h1>{ word }<span>, </span></h1> }
                </div>
            ))}
        </div>

        <div className="game-details">
            {!showRepeat ? (displayGame ? <div>
            <Timer timerValue={timerValue} />
            
            {helpers && helpers.content.map((helper, index) => (
                <div className="helperList">
                    <input type="checkbox" checked={helpers.visibility[index]} />
                    <span className='checkBox'><img src={checkbox} alt="checkmark" /></span>
                    <h3 className={helpers.visibility[index] ? 'helperVisible' : 'helperHidden'}>{ helper }</h3>
                </div>
            ))}</div> : <h1 id="ready-label">Ready?</h1>) : <div>
                    <button className='replayButton' onClick={handleRepeat}><img src={replay} alt="replay button" /></button>
                    <button className='homeButton' onClick={handleHome}><img src={home} alt="home button" /></button>
                </div>}
        </div>

    </div>
  )
}

export default SpeakingGame
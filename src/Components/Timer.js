import React, { useState, useEffect} from 'react'
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'

function Timer({ timerValue }) {

    const[minutes, setMinutes] = useState(0);
    const[seconds, setSeconds] = useState(timerValue);
    const[isSingleDigit, setIsSingleDigit] = useState(false);
    const[isRed, setIsRed] = useState(false);

    useEffect(() => {
        if (seconds < 10) {
            setIsSingleDigit(true)

            if (seconds < 6 && minutes === 0) {
                setIsRed(true)
            }
        }

        if (seconds > 60) {
            setSeconds(seconds - 60)
            setMinutes(1)
        }

        setTimeout(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    setSeconds(0)
                }
                else {
                    setSeconds(59)
                    setMinutes(0)
                    setIsSingleDigit(false)
                }
            }

            else {
                setSeconds(seconds - 1)
            }
        }, 1000)
    }, [seconds])

  return (
    <div className='game-timer'>
        {!isSingleDigit? <h1 className={isRed? 'redText' : 'normalText'}>0{ minutes + ":" + seconds }</h1 > : <h1 className={isRed? 'redText' : 'normalText'}>0{ minutes + ":0" + seconds }</h1>}

        <CountdownCircleTimer isPlaying={minutes !== 0 || seconds !== 0 ? true : false} duration={timerValue} colors={['#BE8D46', '#BE8D46', '#BE8D46', '#BE8D46']} strokeWidth={15} size={270} isSmoothColorTransition={true} colorsTime={[timerValue, 0]} />
    </div>
  )
}

export default Timer
import React from 'react'
import { useEffect, useState } from 'react'


export default function LandingCounter({ num }) {

    const [counter, setCounter] = useState(0)


    useEffect(() => {
        let interval = setInterval(() => {
            setCounter(prevCount => prevCount + 2)
        }, 1);

        if (counter >= num) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [counter])

    return (
        <div>
            <span className="font-bold text-2xl mt-2">{counter}</span>
        </div>
    )
}

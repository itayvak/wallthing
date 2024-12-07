import { useDateTimeStrings } from "@/hooks/useDateTimeStrings"
import { useRandomPhoto } from "@/hooks/useRandomPhoto"
import styles from "@/styles/index.module.css"
import React, { useEffect, useState } from "react"

export default function IndexPage() {
    const {
        timeString, amPmString, dateString
    } = useDateTimeStrings()
    const { 
        currentPhotoURL,
        nextPhoto
    } = useRandomPhoto()

    const [clockTransformX, setClockTransformX] = useState(50)
    const [clockTransformY, setClockTransformY] = useState(50)

    useEffect(() => {
        const moveClock = () => {
            const x = Math.floor(Math.random() * -100)
            const y = Math.floor(Math.random() * -100)
            setClockTransformX(x)
            setClockTransformY(y)
        }
        moveClock()
        const t = setInterval(moveClock, 1000 * 5)
        return () => clearInterval(t)
    }, [])

    return (
        <>
            <div className={styles.dateTimeBox} 
                style={{
                    "--transform-x": `${clockTransformX}%`,
                    "--transform-y": `${clockTransformY}%`
                } as React.CSSProperties}
            >
                <div>
                    <h1 className={styles.timeText}>{timeString}</h1>
                    <p className={styles.amPmText}>{amPmString}</p>
                </div>
                <h2 className={styles.dateText}>{dateString}</h2>
            </div>
            {currentPhotoURL !== "" && 
                <img src={currentPhotoURL} className={styles.photo} onClick={nextPhoto}/>
            }
        </>
    )
}

import {useFloatingClock} from "./useFloatingClock"
import styles from "./FloatingClock.module.css"
import React, {useRef} from "react";

export default function FloatingClock() {
    const clockBoxRef = useRef<HTMLDivElement|null>(null)
    const {
        timeString,
        amPmString,
        dateString,
        clockLeftPos
    } = useFloatingClock(clockBoxRef)

    return (
        <div className={styles.clockBox} ref={clockBoxRef} style={{left: clockLeftPos}}>
            <div>
                <h1 className={styles.timeText}>{timeString}</h1>
                <p className={styles.amPmText}>{amPmString}</p>
            </div>
            <h2 className={styles.dateText}>{dateString}</h2>
        </div>
    )
}
import {useState, useEffect, RefObject} from "react";

export const useFloatingClock = (clockBoxRef: RefObject<HTMLDivElement|null>) => {
    const [timeString, setTimeString] = useState("")
    const [amPmString, setAmPmString] = useState("")
    const [dateString, setDateString] = useState("")
    const [clockLeftPos, setClockLeftPos] = useState(0)

    const updateClockEverySeconds = 10
    const moveClockEverySeconds = 30

    const updateClock = () => {
        // Get time
        const now = new Date()
        let hours = now.getHours()
        const minutes = now.getMinutes()
        const formattedMinutes = minutes.toString().padStart(2, '0');
        hours = hours % 12 || 12
        setTimeString(`${hours}:${formattedMinutes}`)

        // Get AMPM
        const amPm = hours >= 12 ? 'PM' : 'AM'
        setAmPmString(amPm)

        // Get date
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

        const dayOfWeek = daysOfWeek[now.getDay()]
        const month = months[now.getMonth()]
        const date = now.getDate()

        const ordinalSuffix = (date: number) => {
            if (date > 3 && date < 21) return "th"
            switch (date % 10) {
                case 1: return "st"
                case 2: return "nd"
                case 3: return "rd"
                default: return "th"
            }
        }

        setDateString(`${dayOfWeek}, ${month} ${date}${ordinalSuffix(date)}`)
    }

    const moveClock = () => {
        const windowWidth = window.innerWidth
        const clockBoxWidth = clockBoxRef.current?.offsetWidth || 0
        const paddingPx = 12
        const minPos = paddingPx
        const maxPos = windowWidth - clockBoxWidth - paddingPx
        setClockLeftPos(Math.random() * (maxPos - minPos) + minPos)
    }

    useEffect(() => {
        updateClock()
        const t = setInterval(updateClock, 1000 * updateClockEverySeconds)
        return () => clearInterval(t)
    }, [updateClockEverySeconds])

    useEffect(() => {
        moveClock()
        const t = setInterval(moveClock, 1000 * moveClockEverySeconds)
        return () => clearInterval(t)
    }, [clockBoxRef.current, moveClockEverySeconds])

    return {
        timeString,
        amPmString,
        dateString,
        clockLeftPos
    }
}
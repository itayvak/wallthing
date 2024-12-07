import { useEffect, useState } from "react"

export const useDateTimeStrings = () => {
    const [timeString, setTimeString] = useState("")
    const [amPmString, setAmPmString] = useState("")
    const [dateString, setDateString] = useState("")

    const updateClock = () => {
        const now = new Date()
        let hours = now.getHours()
        const minutes = now.getMinutes()
        const formattedMinutes = minutes.toString().padStart(2, '0');
        hours = hours % 12 || 12
        setTimeString(`${hours}:${formattedMinutes}`)

        const amPm = hours >= 12 ? 'PM' : 'AM'
        setAmPmString(amPm)

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

    useEffect(() => {
        updateClock()
        const t = setInterval(updateClock, 1000 * 10)
        return () => clearInterval(t)
    }, [])

    return {
        timeString, amPmString, dateString
    }
}
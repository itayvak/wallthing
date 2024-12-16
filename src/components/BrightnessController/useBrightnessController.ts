import {useState, useEffect} from "react";

export const useBrightnessController = () => {
    const [isNight, setIsNight] = useState(false)

    const checkEveryMinutes = 5

    useEffect(() => {
        const checkTime = () => {
            const now = new Date()
            const hours = now.getHours()
            setIsNight(hours >= 23 || hours < 7)
        }
        checkTime()
        const t = setInterval(checkTime, 1000 * 60 * checkEveryMinutes)
        return () => clearInterval(t)
    }, [])

    return {
        isNight
    }
}
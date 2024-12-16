import {useState, useEffect} from "react";

export const useCrossfadeImage = (src: string | undefined) => {
    const [faderImageURL, setFaderImageURL] = useState<string|undefined>(undefined)
    const [faderImageState, setFaderImageState] = useState<"hidden"|"fade-out">("hidden")


    useEffect(() => {
        // every time the image is changed, show the fader image (without updating its image url),
        // fade it out, and only then update the fader image url
        if(!src) return
        console.log(`update ${src}`)
        setFaderImageState("fade-out")
        const t = setTimeout(() => {
            setFaderImageState("hidden")
            setFaderImageURL(src)
        }, 5000)
        return () => clearTimeout(t)
    }, [src])

    return {
        faderImageState,
        faderImageURL
    }
}
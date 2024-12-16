import {useState, useEffect, useCallback} from "react";

export const useRandomBGImage = () => {
    const [allPhotoURLs, setAllPhotoURLs] = useState<string[]>([])
    const [currentPhotoURL, setCurrentPhotoURL] = useState("")

    const bucketName = "wallthing_display-photos"
    const switchEverySeconds = 10

    const listPhotos = async () => {
        const res = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o`)
        const json = await res.json()
        const urls = json.items.map((o: any) => o.mediaLink) as string[]
        return urls
    }

    useEffect(() => {
        listPhotos().then(setAllPhotoURLs)
    }, [])

    const switchPhoto = () => {
        const randomUrl = allPhotoURLs[Math.floor(Math.random() * allPhotoURLs.length)];
        setCurrentPhotoURL(randomUrl)
    }

    useEffect(() => {
        switchPhoto()
        const i = setInterval(switchPhoto, 1000 * switchEverySeconds)
        return () => clearInterval(i)
    }, [allPhotoURLs])

    return {
        currentPhotoURL,
        switchPhoto
    }
}
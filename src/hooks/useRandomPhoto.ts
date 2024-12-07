import { useEffect, useState } from "react"

export const useRandomPhoto = () => {
    const [allPhotoURLs, setAllPhotoURLs] = useState<string[]>([])
    const [currentPhotoURL, setCurrentPhotoURL] = useState("")

    const BUCKET_NAME = "wallthing_display-photos"

    const listPhotos = async () => {
        const res = await fetch(`https://storage.googleapis.com/storage/v1/b/${BUCKET_NAME}/o`)
        const json = await res.json()
        const urls = json.items.map((o: any) => o.mediaLink) as string[]
        setAllPhotoURLs(urls)
    }

    const nextPhoto = () => {
        if (allPhotoURLs.length > 0) {
            const randomUrl = allPhotoURLs[Math.floor(Math.random() * allPhotoURLs.length)]
            console.log(randomUrl)
            setCurrentPhotoURL(randomUrl)
        }
    }

    useEffect(() => {
        listPhotos()
        const t = setInterval(listPhotos, 1000 * 60 * 60) // refresh every hour
        return () => clearInterval(t)
    }, [])

    useEffect(() => {
        nextPhoto()
        const t = setInterval(nextPhoto, 1000 * 30)
        return () => clearInterval(t)
    }, [allPhotoURLs])

    return {
        currentPhotoURL, nextPhoto
    }
}
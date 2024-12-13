import {useState, useEffect, useCallback} from "react";

export const useRandomBGImage = () => {
    const [allPhotoURLs, setAllPhotoURLs] = useState<string[]>([])
    const [currentPhotoURL, setCurrentPhotoURL] = useState("")
    const [nextPhotoURL, setNextPhotoURL] = useState("")
    const [nextPhotoState, setNextPhotoState] = useState<"hidden"|"fade-in">("hidden")

    const bucketName = "wallthing_display-photos"
    const switchEverySeconds = 20

    const listPhotos = async () => {
        const res = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o`)
        const json = await res.json()
        const urls = json.items.map((o: any) => o.mediaLink) as string[]
        setAllPhotoURLs(urls)
    }

    useEffect(() => {
        listPhotos()
        const t = setInterval(listPhotos, 1000 * 60 * 60) // refresh every hour
        return () => clearInterval(t)
    }, [])

    const nextPhoto = useCallback(() => {
        // Start fading in the next photo
        setNextPhotoState("fade-in");

        // After 2 seconds, swap photos and prepare the next random photo
        setTimeout(() => {
            setNextPhotoState("hidden");
            setCurrentPhotoURL(nextPhotoURL);

            const randomUrl = allPhotoURLs[Math.floor(Math.random() * allPhotoURLs.length)];
            setNextPhotoURL(randomUrl);
        }, 2000); // 2 seconds for fade-in
    }, [nextPhotoURL]);

    // Automatic 10-second interval to switch photos
    useEffect(() => {
        const interval = setInterval(() => {
            nextPhoto(); // Automatically switch to the next photo
        }, 10000); // 10 seconds delay between switches

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [nextPhoto]); // Re-run when `nextPhoto` changes

    return {
        currentPhotoURL,
        nextPhotoURL,
        nextPhotoState,
        nextPhoto
    }
}
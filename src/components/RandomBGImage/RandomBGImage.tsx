import {useRandomBGImage} from "./useRandomBGImage"
import styles from "./RandomBGImage.module.css"

export default function RandomBGImage() {
    const {
        currentPhotoURL,
        nextPhotoURL,
        nextPhotoState,
        nextPhoto
    } = useRandomBGImage()

    if(!currentPhotoURL) return  <></>
    else return (
        <>
            <img onClick={nextPhoto} className={styles.image} src={currentPhotoURL} alt="image"/>
            <img onClick={nextPhoto} className={`${styles.image} ${styles.nextImage} ${nextPhotoState == "fade-in" && styles.fadeIn}`} src={nextPhotoURL} alt="next-image"/>
        </>
    )
}
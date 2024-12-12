import {useRandomBGImage} from "./useRandomBGImage"
import styles from "./RandomBGImage.module.css"
import Image from "next/image";

export default function RandomBGImage() {
    const {
        currentPhotoURL,
        nextPhoto
    } = useRandomBGImage()

    if(!currentPhotoURL) return  <></>
    else return (
        <img className={styles.image} onClick={nextPhoto} src={currentPhotoURL} alt="image"/>
    )
}
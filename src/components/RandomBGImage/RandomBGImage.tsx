import {useRandomBGImage} from "./useRandomBGImage"
import styles from "./RandomBGImage.module.css"
import CrossfadeImage from "@/components/CrossfadeImage/CrossfadeImage";

export default function RandomBGImage() {
    const {
        currentPhotoURL,
        switchPhoto
    } = useRandomBGImage()

    if(!currentPhotoURL) return  <></>
    else return (
        <>
            <CrossfadeImage
                onClick={switchPhoto}
                holderClassName={styles.imageHolder}
                imageClassName={styles.image}
                src={currentPhotoURL}
            />
        </>
    )
}
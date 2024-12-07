import { useDateTimeStrings } from "@/hooks/useDateTimeStrings"
import { useRandomPhoto } from "@/hooks/useRandomPhoto"
import styles from "@/styles/index.module.css"

export default function IndexPage() {
    const {
        timeString, amPmString, dateString
    } = useDateTimeStrings()
    const { 
        currentPhotoURL,
        nextPhoto
    } = useRandomPhoto()

    return (
        <>
            <div className={styles.dateTimeBox}>
                <div>
                    <h1 className={styles.timeText}>{timeString}</h1>
                    <p className={styles.amPmText}>{amPmString}</p>
                </div>
                <h2 className={styles.dateText}>{dateString}</h2>
            </div>
            {currentPhotoURL !== "" && 
                <img src={currentPhotoURL} className={styles.photo} onClick={nextPhoto}/>
            }
        </>
    )
}

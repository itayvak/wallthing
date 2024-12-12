import {useBrightnessController} from "./useBrightnessController"
import styles from "./BrightnessController.module.css"

export default function BrightnessController() {
    const {
        isNight
    } = useBrightnessController()

    return (
        <div className={styles.brightnessOverlay} data-night={isNight}>
        </div>
    )
}
import {useCrossfadeImage} from "./useCrossfadeImage"
import styles from "./CrossfadeImage.module.css"
import React, {ComponentProps, useEffect, useState} from "react";

type Props = {
    src: string,
    holderClassName?: string
    imageClassName?: string
    onClick?: () => void
}

const CrossfadeImage: React.FC<Props> = (props) => {
    const {
        faderImageState,
        faderImageURL
    } = useCrossfadeImage(props.src)

    return (
        <div className={props.holderClassName}>
            <img
                src={props.src}
                className={`${styles.mainImage} ${props.imageClassName||""}`}
                onClick={props.onClick}
            />
            <img
                src={faderImageURL}
                data-state={faderImageState}
                className={`${styles.faderImage} ${props.imageClassName||""}`}
                onClick={props.onClick}
            />
        </div>
    )
}

export default CrossfadeImage
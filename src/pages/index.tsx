import React from "react"
import FloatingClock from "@/components/FloatingClock/FloatingClock";
import RandomBGImage from "@/components/RandomBGImage/RandomBGImage";
import BrightnessController from "@/components/BrightnessController/BrightnessController";

export default function IndexPage() {
    return (
        <>
            <FloatingClock/>
            <RandomBGImage/>
            <BrightnessController/>
        </>
    )
}

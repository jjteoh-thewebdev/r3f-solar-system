"use client"

import { useEffect, useRef, useState } from "react"

export default function AudioControls() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        // Set initial volume
        audio.volume = 0.5

        // Handle keyboard controls
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault()
                if (audio.paused) {
                    audio.play()
                    setIsPlaying(true)
                } else {
                    audio.pause()
                    setIsPlaying(false)
                }
            }

            if (e.ctrlKey && (e.code === "ArrowUp" || e.code === "ArrowDown")) {
                e.preventDefault()
                const volumeChange = e.code === "ArrowUp" ? 0.1 : -0.1
                audio.volume = Math.max(0, Math.min(1, audio.volume + volumeChange))
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <audio
            ref={audioRef}
            src="/ambient-bg-music.mp3"
            autoPlay
            loop
        />
    )
} 
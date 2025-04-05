"use client"

import { createContext, useContext, useRef, useState, useEffect } from "react"

interface AudioContextType {
    isPlaying: boolean
    pause: () => void
    resume: () => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        // Set initial volume and state
        audio.volume = 0.5
        setIsPlaying(true)

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

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    const resume = () => {
        if (audioRef.current) {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    return (
        <AudioContext.Provider value={{ isPlaying, pause, resume }}>
            {children}
            <audio
                ref={audioRef}
                src="/ambient-bg-music.mp3"
                autoPlay
                loop
            />
        </AudioContext.Provider>
    )
}

export function useAudio() {
    const context = useContext(AudioContext)
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider")
    }
    return context
} 
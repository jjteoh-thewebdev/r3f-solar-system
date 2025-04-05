"use client"

import { createContext, useContext, useRef, useState } from "react"

interface AudioContextType {
    isPlaying: boolean
    pause: () => void
    resume: () => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

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
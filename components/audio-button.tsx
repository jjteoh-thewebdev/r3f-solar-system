"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/lib/audio-context"
import { useMobile } from "@/lib/hooks/use-mobile"

export default function AudioButton() {
    const { isPlaying, pause, resume } = useAudio()
    const isMobile = useMobile()

    // Only show on mobile devices
    if (!isMobile) return null

    const toggleAudio = () => {
        if (isPlaying) {
            pause()
        } else {
            resume()
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleAudio}
            className="absolute top-4 left-4 h-12 w-12 rounded-full bg-gray-200/90 hover:bg-gray-300/90 border-2 border-gray-400/70 ring-2 ring-gray-400/30 hover:ring-gray-400/50 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
            title={isPlaying ? "Pause music" : "Play music"}
        >
            {isPlaying ? (
                <Volume2 className="h-6 w-6 text-gray-800" />
            ) : (
                <VolumeX className="h-6 w-6 text-gray-800" />
            )}
        </Button>
    )
} 
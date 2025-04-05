"use client"

import { useState, useEffect } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/lib/hooks/use-mobile"

export default function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const isMobile = useMobile()

    // Update fullscreen state when user presses ESC
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }
    }, [])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    // Don't render on mobile
    if (isMobile) return null

    return (
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen (ESC)" : "Enter fullscreen"}
        >
            {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
            ) : (
                <Maximize2 className="h-5 w-5" />
            )}
        </Button>
    )
} 
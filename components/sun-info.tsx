"use client"

import type { SunData } from "@/lib/planet-data"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import VideoPlayer from "./video-player"

interface SunInfoProps {
    sun: SunData
    onClose: () => void
}

export default function SunInfo({ sun, onClose }: SunInfoProps) {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVideoOpen, setIsVideoOpen] = useState(false)

    useEffect(() => {
        // Trigger the fade-in animation after mount
        const timer = setTimeout(() => setIsVisible(true), 50)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Don't close if video player is open
            if (isVideoOpen) return

            // Check if the click is outside the planet info card
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                // Check if the click is not on the Dialog
                const dialog = document.querySelector('[role="dialog"]')
                if (!dialog || !dialog.contains(event.target as Node)) {
                    handleClose()
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        // Wait for fade-out animation before calling onClose
        setTimeout(onClose, 300)
    }

    const handleOpenVideo = () => {
        setIsVideoOpen(true)
    }

    const handleCloseVideo = () => {
        setIsVideoOpen(false)
    }

    return (
        <>
            <div
                ref={containerRef}
                className={`absolute top-4 right-4 w-80 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
            >
                <Card className="bg-black/80 text-white border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl font-bold">{sun.name}</CardTitle>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="text-gray-400">Type:</div>
                                <div>{sun.type}</div>

                                <div className="text-gray-400">Diameter:</div>
                                <div>{sun.diameter.toLocaleString()} km</div>

                                <div className="text-gray-400">Surface Temperature:</div>
                                <div>{sun.surfaceTemp}</div>

                                <div className="text-gray-400">Age:</div>
                                <div>{sun.age}</div>
                            </div>

                            <p className="text-sm mt-2">{sun.description}</p>
                        </div>
                    </CardContent>

                    {sun.videoUrl && (
                        <CardFooter>
                            <Button variant="outline" className="w-full flex items-center gap-2 text-black" onClick={handleOpenVideo}>
                                <Play className="h-4 w-4" />
                                Watch Video
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
            {sun.videoUrl && (
                <VideoPlayer
                    isOpen={isVideoOpen}
                    onClose={handleCloseVideo}
                    videoUrl={sun.videoUrl}
                    title={`${sun.emoji} About ${sun.name}`}
                    source={sun.videoSource}
                />
            )}
        </>
    )
}


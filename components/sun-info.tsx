"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import VideoPlayer from "./video-player"
import { useAudio } from "@/lib/audio-context"
import type { SunData } from "@/lib/planet-data"

interface SunInfoProps {
    sun: SunData
    onClose: () => void
    isVisible: boolean
}

export default function SunInfo({ sun, onClose, isVisible }: SunInfoProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false)
    const { pause, resume } = useAudio()

    const handleOpenVideo = () => {
        setIsVideoOpen(true)
        pause() // Pause background music when video opens
    }

    const handleCloseVideo = () => {
        setIsVideoOpen(false)
        resume() // Resume background music when video closes
    }

    return (
        <>
            <div
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


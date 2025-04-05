"use client"

import { useState } from "react"
import type { PlanetData } from "@/lib/planet-data"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import VideoPlayer from "./video-player"
import { useAudio } from "@/lib/audio-context"

interface PlanetInfoProps {
    planet: PlanetData
    onClose: () => void
    isVisible: boolean
}

export default function PlanetInfo({ planet, onClose, isVisible }: PlanetInfoProps) {
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
                        <CardTitle className="text-xl font-bold">{planet.name}</CardTitle>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="text-gray-400">Type:</div>
                                <div>{planet.type}</div>

                                <div className="text-gray-400">Diameter:</div>
                                <div>{planet.diameter} km</div>

                                <div className="text-gray-400">Distance from Sun:</div>
                                <div>{planet.realDistanceFromSun} million km</div>

                                <div className="text-gray-400">Day Length:</div>
                                <div>{planet.dayLength}</div>

                                <div className="text-gray-400">Year Length:</div>
                                <div>{planet.yearLength}</div>

                                {planet.moons && (
                                    <>
                                        <div className="text-gray-400">Moons:</div>
                                        <div>{planet.moons.length}</div>
                                    </>
                                )}
                            </div>

                            <p className="text-sm mt-2">{planet.description}</p>
                        </div>
                    </CardContent>
                    {planet.videoUrl && (
                        <CardFooter>
                            <Button variant="outline" className="w-full flex items-center gap-2 text-black" onClick={handleOpenVideo}>
                                <Play className="h-4 w-4" />
                                Watch Video
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>

            {planet.videoUrl && (
                <VideoPlayer
                    isOpen={isVideoOpen}
                    onClose={handleCloseVideo}
                    videoUrl={planet.videoUrl}
                    title={`${planet.emoji}About ${planet.name}`}
                    source={planet.videoSource}
                />
            )}
        </>
    )
}


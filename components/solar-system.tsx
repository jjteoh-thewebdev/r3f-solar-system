"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useMobile } from "@/lib/hooks/use-mobile"
import { type PlanetData, planets, sunData, SunData } from "@/lib/planet-data"
import Planet from "@/components/planet"
import PlanetInfo from "@/components/planet-info"
import Sun from "@/components/sun"
import Galaxy from "@/components/galaxy"
import SunInfo from "./sun-info"
import Legend from "./legend"
import PerformanceMonitor from "./performance-monitor"
import FullscreenButton from "./fullscreen-button"
import LoadingScreen from "./loading-screen"
import AudioButton from "./audio-button"

export default function SolarSystem() {
    const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
    const [selectedSun, setSelectedSun] = useState<SunData | null>(null)
    const [isInfoVisible, setIsInfoVisible] = useState(false)
    const [quality, setQuality] = useState<"high" | "medium" | "low">("high")
    const [isLoading, setIsLoading] = useState(true)
    const controlsRef = useRef(null)
    const isMobile = useMobile()

    // Adjust camera position based on device type
    const cameraPosition: [number, number, number] = isMobile ? [0, 20, 40] : [0, 20, 30]
    // field of view(fov) measures in degrees(angle between the camera and the scene)
    // the higher the number, the more of the scene is visible
    const cameraFov = isMobile ? 60 : 45 

    // Calculate DPR(Device Pixel Ratio) based on quality and device type
    const getDPR = () => {
        if (isMobile) {
            return quality === "high" ? 1 : 0.75
        }

        return quality === "high" ? 2 : quality === "medium" ? 1.5 : 1
    }

    const handleQualityChange = (newQuality: "high" | "medium" | "low") => {
        setQuality(newQuality)
    }

    const handleSunClick = () => {
        setSelectedSun(sunData)
        setSelectedPlanet(null)
        setIsInfoVisible(true)
    }

    const handlePlanetClick = (planet: PlanetData) => {
        setSelectedPlanet(planet)
        setSelectedSun(null)
        setIsInfoVisible(true)
    }

    const handleCloseInfo = () => {
        setIsInfoVisible(false)
        // Wait for fade-out animation before clearing selection
        setTimeout(() => {
            setSelectedPlanet(null)
            setSelectedSun(null)
        }, 300)
    }

    return (
        <div className="relative w-full h-full">
            {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
            <FullscreenButton />
            <AudioButton />
            <Canvas
                camera={{
                    position: cameraPosition,
                    fov: cameraFov,
                    near: 0.1,
                    far: 1000,
                }}
                dpr={getDPR()}
                gl={{
                    antialias: quality === "high" && !isMobile,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                    alpha: false,
                }}
            >
                <PerformanceMonitor onQualityChange={handleQualityChange} />
                <color attach="background" args={["#000"]} />
                <ambientLight intensity={0.6} />
                <pointLight position={[0, 0, 0]} intensity={2} />
                <Galaxy />
                <Sun onClick={handleSunClick} />
                {planets.map((planet) => (
                    <Planet
                        key={planet.name}
                        planet={planet}
                        onClick={() => handlePlanetClick(planet)}
                    />
                ))}
                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    minDistance={5}
                    maxDistance={100}
                />
            </Canvas>

            <Legend />

            {selectedPlanet && (
                <PlanetInfo
                    planet={selectedPlanet}
                    onClose={handleCloseInfo}
                    isVisible={isInfoVisible}
                />
            )}

            {selectedSun && (
                <SunInfo
                    sun={selectedSun}
                    onClose={handleCloseInfo}
                    isVisible={isInfoVisible}
                />
            )}
        </div>
    )
}


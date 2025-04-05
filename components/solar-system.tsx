"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { type PlanetData, planets, sunData, SunData } from "@/lib/planet-data"
import Planet from "@/components/planet"
import PlanetInfo from "@/components/planet-info"
import Sun from "@/components/sun"
import Galaxy from "@/components/galaxy"
import AudioControls from "@/components/audio-controls"
import SunInfo from "./sun-info"
import Legend from "./legend"

export default function SolarSystem() {
    const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
    const [selectedSun, setSelectedSun] = useState<SunData | null>(null)
    const [isInfoVisible, setIsInfoVisible] = useState(false)
    const controlsRef = useRef(null)

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
            <AudioControls />
            <Canvas camera={{ position: [0, 20, 50], fov: 60 }}>
                <color attach="background" args={["#000"]} />
                <ambientLight intensity={0.6} />
                <pointLight position={[0, 0, 0]} intensity={4} color="#fff" />

                <Galaxy />
                <Sun onClick={handleSunClick} />

                {/* Planets */}
                {planets.map((planet) => (
                    <Planet key={planet.id} planet={planet} onClick={() => handlePlanetClick(planet)} />
                ))}

                <OrbitControls
                    ref={controlsRef}
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={10}
                    maxDistance={200}
                />
            </Canvas>

            {selectedPlanet && (
                <PlanetInfo
                    key={selectedPlanet.id}
                    planet={selectedPlanet}
                    onClose={handleCloseInfo}
                    isVisible={isInfoVisible}
                />
            )}
            {selectedSun && (
                <SunInfo
                    key="sun"
                    sun={selectedSun}
                    onClose={handleCloseInfo}
                    isVisible={isInfoVisible}
                />
            )}

            <Legend />
        </div>
    )
}


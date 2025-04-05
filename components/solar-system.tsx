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

export default function SolarSystem() {
    const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
    const [selectedSun, setSelectedSun] = useState<SunData | null>(null)
    const controlsRef = useRef(null)

    const handleSunClick = () => {
        setSelectedSun(sunData)
        setSelectedPlanet(null)
    }

    const handlePlanetClick = (planet: PlanetData) => {
        setSelectedPlanet(planet)
        setSelectedSun(null)
    }

    const handleCloseInfo = () => {
        setSelectedPlanet(null)
        setSelectedSun(null)
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

            {selectedPlanet && <PlanetInfo planet={selectedPlanet} onClose={handleCloseInfo} />}
            {selectedSun && <SunInfo sun={selectedSun} onClose={handleCloseInfo} />}

            <div className="absolute bottom-4 left-4 text-white bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md p-4 rounded-lg shadow-xl border border-gray-700/50">
                <p>Click on a planet to view details</p>
                <p>Use mouse to orbit, scroll to zoom</p>
                <p>Press Space to toggle music, Ctrl + ↑/↓ to adjust volume</p>
                <p>
                    Music by <a className="underline text-blue-400 hover:text-blue-300" href="https://pixabay.com/users/clavier-music-16027823/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=310690">Clavier Clavier</a> from <a className="underline text-blue-400 hover:text-blue-300" href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=310690">Pixabay</a>
                </p>
            </div>
        </div>
    )
}


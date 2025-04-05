"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type { PlanetData } from "@/lib/planet-data"
import * as THREE from "three"

interface PlanetProps {
    planet: PlanetData
    onClick: () => void
}

export default function Planet({ planet, onClick }: PlanetProps) {
    const planetRef = useRef<THREE.Mesh>(null)
    const orbitRef = useRef<THREE.Group>(null)
    const textRef = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState(false)

    // Create a texture for the planet
    const texture = new THREE.TextureLoader().load(planet.textureUrl)

    // Rotate the planet and orbit
    useFrame((state, delta) => {
        if (planetRef.current) {
            // Rotate the planet on its axis
            planetRef.current.rotation.y += delta * planet.rotationSpeed
        }

        if (orbitRef.current) {
            // Rotate the orbit
            orbitRef.current.rotation.y += delta * planet.orbitSpeed
        }

        if (textRef.current && hovered) {
            // Make text face the camera
            textRef.current.lookAt(state.camera.position)
        }
    })

    return (
        <group>
            {/* Orbit line */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[planet.distanceFromSun, planet.distanceFromSun + 0.05, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
            </mesh>

            {/* Planet orbit group */}
            <group ref={orbitRef}>
                <group position={[planet.distanceFromSun, 0, 0]}>
                    {/* Planet */}
                    <mesh
                        ref={planetRef}
                        onClick={onClick}
                        onPointerOver={() => setHovered(true)}
                        onPointerOut={() => setHovered(false)}
                    >
                        <sphereGeometry args={[planet.size, 32, 32]} />
                        <meshStandardMaterial
                            map={texture}
                            // emissive={hovered ? "#cccccc" : "#888888"}
                            // emissiveIntensity={hovered ? 0.1 : 0.05}
                            emissive="#888888"
                            emissiveIntensity={0.05}
                            roughness={0.5}
                            metalness={0.1}
                        />
                    </mesh>

                    {/* Planet name label */}
                    {hovered && (
                        <group ref={textRef}>
                            <Text
                                position={[0, planet.size + 1, 0]}
                                fontSize={1}
                                color="white"
                                anchorX="center"
                                anchorY="middle"
                            >
                                {planet.name}
                            </Text>
                        </group>
                    )}

                    {/* Moons if any */}
                    {/* {planet.moons &&
                        planet.moons.map((moon, index) => (
                            <group key={index} rotation={[0, Math.random() * Math.PI * 2, 0]}>
                                <mesh position={[planet.size + 1 + index * 0.5, 0, 0]}>
                                    <sphereGeometry args={[moon.size, 16, 16]} />
                                    <meshBasicMaterial color={moon.color} />
                                </mesh>
                            </group>
                        ))} */}
                </group>
            </group>
        </group>
    )
}


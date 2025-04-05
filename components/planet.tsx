"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type { PlanetData } from "@/lib/planet-data"
import * as THREE from "three"
import { useMobile } from "@/lib/hooks/use-mobile"
import { useOptimizedTexture } from "@/lib/hooks/use-optimized-texture"

interface PlanetProps {
    planet: PlanetData
    onClick: () => void
}

export default function Planet({ planet, onClick }: PlanetProps) {
    const planetRef = useRef<THREE.Mesh>(null)
    const orbitRef = useRef<THREE.Group>(null)
    const textRef = useRef<THREE.Group>(null)
    const ringRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const isMobile = useMobile()

    // Create geometries with reduced segments for mobile
    const sphereGeometry = useMemo(() => {
        const segments = isMobile ? 16 : 32
        return new THREE.SphereGeometry(planet.size, segments, segments)
    }, [planet.size, isMobile])

    // Create orbit line geometry
    const orbitGeometry = useMemo(() => {
        const points = []
        const segments = isMobile ? 32 : 64
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2
            const x = Math.cos(angle) * planet.distanceFromSun
            const z = Math.sin(angle) * planet.distanceFromSun
            points.push(new THREE.Vector3(x, 0, z))
        }
        return new THREE.BufferGeometry().setFromPoints(points)
    }, [planet.distanceFromSun, isMobile])

    const ringGeometry = useMemo(() => {
        if (planet.name !== "Saturn") return null
        const segments = isMobile ? 32 : 64
        return new THREE.RingGeometry(planet.size * 1.2, planet.size * 1.7, segments)
    }, [planet.name, planet.size, isMobile])

    // Use optimized texture loading
    const texture = useOptimizedTexture(planet.textureUrl)
    const ringTexture = useOptimizedTexture('/textures/planets/2k_saturn_ring_alpha.png')

    // Rotate the planet and orbit
    useFrame((state, delta) => {
        if (planetRef.current) {
            // Apply axial tilt
            planetRef.current.rotation.x = THREE.MathUtils.degToRad(planet.axialTilt)

            // Rotate around the tilted axis
            planetRef.current.rotation.y += delta * planet.rotationSpeed
        }

        if (ringRef.current) {
            // Apply the same tilt to rings
            ringRef.current.rotation.x = THREE.MathUtils.degToRad(90 + planet.axialTilt)
            // Rotate the rings with the planet
            ringRef.current.rotation.z += delta * planet.rotationSpeed
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
            <primitive object={new THREE.Line(orbitGeometry, new THREE.LineBasicMaterial({
                color: "#4a90e2",
                transparent: true,
                opacity: 0.3,
                linewidth: 1
            }))} />

            {/* Planet orbit group */}
            <group ref={orbitRef}>
                <group position={[planet.distanceFromSun, 0, 0]}>
                    {/* Planet */}
                    <mesh
                        ref={planetRef}
                        onClick={onClick}
                        onPointerOver={() => setHovered(true)}
                        onPointerOut={() => setHovered(false)}
                        geometry={sphereGeometry}
                    >
                        <meshStandardMaterial
                            map={texture}
                            emissive="#888888"
                            emissiveIntensity={0.05}
                            roughness={0.5}
                            metalness={0.1}
                        />
                    </mesh>

                    {/* Saturn's rings */}
                    {planet.name === "Saturn" && ringGeometry && (
                        <mesh
                            ref={ringRef}
                            geometry={ringGeometry}
                        >
                            <meshBasicMaterial
                                map={ringTexture}
                                transparent
                                side={THREE.DoubleSide}
                                depthWrite={false}
                            />
                        </mesh>
                    )}

                    {/* Planet name label - only show on desktop */}
                    {(hovered && !isMobile) && (
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


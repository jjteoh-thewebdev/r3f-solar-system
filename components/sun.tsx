"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMobile } from "@/lib/hooks/use-mobile"
import { useOptimizedTexture } from "@/lib/hooks/use-optimized-texture"

interface SunProps {
    onClick: () => void
}

export default function Sun({ onClick }: SunProps) {
    const isMobile = useMobile()
    const sunRef = useRef<THREE.Mesh>(null)
    const glowRef = useRef<THREE.Mesh>(null)

    // Create optimized geometry
    const geometry = useMemo(() => {
        const segments = isMobile ? 32 : 64
        return new THREE.SphereGeometry(5, segments, segments)
    }, [isMobile])

    // Create glow geometry (slightly larger than the sun)
    const glowGeometry = useMemo(() => {
        const segments = isMobile ? 32 : 64
        return new THREE.SphereGeometry(5.2, segments, segments)
    }, [isMobile])

    // Use optimized texture loading
    const texture = useOptimizedTexture('/textures/2k_sun.jpg')

    // Create noise texture for surface activity
    const noiseTexture = useMemo(() => {
        const size = isMobile ? 256 : 512
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) return null

        const imageData = ctx.createImageData(size, size)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 255
            data[i] = noise     // r
            data[i + 1] = noise * 0.8 // g
            data[i + 2] = 0     // b
            data[i + 3] = noise * 0.5 // alpha
        }

        ctx.putImageData(imageData, 0, 0)
        const noiseTexture = new THREE.CanvasTexture(canvas)
        noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping
        return noiseTexture
    }, [isMobile])

    // Animate the sun
    useFrame((state, delta) => {
        if (sunRef.current) {
            // Rotate the sun
            sunRef.current.rotation.y += delta * 0.1

            // Animate noise texture
            if (noiseTexture) {
                noiseTexture.offset.x += delta * 0.05
                noiseTexture.offset.y += delta * 0.05
            }
        }

        if (glowRef.current) {
            // Make glow face camera
            glowRef.current.quaternion.copy(state.camera.quaternion)
        }
    })

    return (
        <group>
            {/* Main sun sphere */}
            <mesh
                ref={sunRef}
                onClick={onClick}
                geometry={geometry}
            >
                <meshStandardMaterial
                    map={texture}
                    emissive="#ff7700"
                    emissiveMap={texture}
                    emissiveIntensity={1}
                />
            </mesh>

            {/* Inner glow */}
            <mesh
                ref={glowRef}
                geometry={glowGeometry}
            >
                <meshBasicMaterial
                    map={noiseTexture || undefined}
                    transparent
                    opacity={0.4}
                    color="#ff4400"
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Outer glow */}
            <mesh
                geometry={glowGeometry}
                scale={1.2}
            >
                <meshBasicMaterial
                    color="#ff2200"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Corona effect */}
            <mesh
                geometry={glowGeometry}
                scale={1.5}
            >
                <meshBasicMaterial
                    color="#ff8844"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    )
} 
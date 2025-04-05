"use client"

import { useMemo } from "react"
import * as THREE from "three"
import { useMobile } from "@/lib/hooks/use-mobile"
import { useOptimizedTexture } from "@/lib/hooks/use-optimized-texture"

// skybox - is a technique used to simulate a large, open space by surrounding the viewer with a continuous, seamless texture of a sky or other environment.
// in this case, we are using a texture of a milky way galaxy
export default function Galaxy() {
    const isMobile = useMobile()

    // Create optimized geometry
    const geometry = useMemo(() => {
        const segments = isMobile ? [20, 15] : [60, 40]
        return new THREE.SphereGeometry(500, segments[0], segments[1])
    }, [isMobile])

    // Use optimized texture loading
    const texture = useOptimizedTexture('/textures/2k_stars_milky_way.jpg')

    return (
        <mesh geometry={geometry}>
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    )
} 
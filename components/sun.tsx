"use client"

import { useMemo } from "react"
import * as THREE from "three"
import { useMobile } from "@/lib/hooks/use-mobile"
import { useOptimizedTexture } from "@/lib/hooks/use-optimized-texture"

interface SunProps {
    onClick: () => void
}

export default function Sun({ onClick }: SunProps) {
    const isMobile = useMobile()

    // Create optimized geometry
    const geometry = useMemo(() => {
        const segments = isMobile ? 16 : 32
        return new THREE.SphereGeometry(5, segments, segments)
    }, [isMobile])

    // Use optimized texture loading
    const texture = useOptimizedTexture('/textures/2k_sun.jpg')

    return (
        <mesh
            onClick={onClick}
            position={[0, 0, 0]}
            geometry={geometry}
        >
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}
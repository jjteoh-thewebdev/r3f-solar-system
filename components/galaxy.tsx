"use client"

import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

// skybox - is a technique used to simulate a large, open space by surrounding the viewer with a continuous, seamless texture of a sky or other environment.
// in this case, we are using a texture of a milky way galaxy
export default function Galaxy() {
    const texture = useLoader(THREE.TextureLoader, '/textures/2k_stars_milky_way.jpg')
    return (
        <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    )
} 
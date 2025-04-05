import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

interface SunProps {
    onClick: () => void
}

export default function Sun({ onClick }: SunProps) {
    const texture = useLoader(THREE.TextureLoader, '/textures/2k_sun.jpg')
    return (
        <mesh
            onClick={onClick}
            position={[0, 0, 0]}>
            <sphereGeometry args={[5, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}
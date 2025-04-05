import { useMemo } from 'react'
import * as THREE from 'three'
import { useMobile } from './use-mobile'

export function useOptimizedTexture(url: string) {
    const isMobile = useMobile()

    return useMemo(() => {
        const texture = new THREE.TextureLoader().load(url)

        // useLoader provide better performance
        // because it leverages R3F Built-in caching (via three-stdlib loader cache).
        // but it's not working in this case(using inside a custom hook)
        // const texture = useLoader(THREE.TextureLoader, url) //@react-three/fiber


        // Optimize texture for mobile
        if (isMobile) {
            texture.minFilter = THREE.LinearFilter // Use simpler filtering
            texture.magFilter = THREE.LinearFilter
            texture.generateMipmaps = false // Disable mipmaps to save memory
            texture.anisotropy = 1 // Reduce anisotropy for better performance
        } else {
            texture.minFilter = THREE.LinearMipMapLinearFilter // Better quality for desktop
            texture.magFilter = THREE.LinearFilter
            texture.generateMipmaps = true
            texture.anisotropy = 4 // Better quality for desktop
        }

        return texture
    }, [url, isMobile])
} 
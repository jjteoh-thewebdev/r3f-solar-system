"use client"

import { useMemo } from 'react'
import * as THREE from 'three'
import { useMobile } from './use-mobile'

interface TextureOptions {
    minFilter?: THREE.MinificationTextureFilter
    magFilter?: THREE.MagnificationTextureFilter
    anisotropy?: number
    generateMipmaps?: boolean
    colorSpace?: THREE.ColorSpace
}

export function useOptimizedTexture(
    url: string,
    options: TextureOptions = {}
) {
    const isMobile = useMobile()

    return useMemo(() => {
        const texture = new THREE.TextureLoader().load(url, (texture) => {
            // Apply texture optimizations after loading
            // minFilter: controls the quality of the texture when it's far away
            texture.minFilter = options.minFilter || (isMobile ? THREE.LinearFilter : THREE.LinearMipMapLinearFilter)
            // magFilter: controls the quality of the texture when it's close up
            texture.magFilter = options.magFilter || THREE.LinearFilter
            // anisotropy: controls the quality of the texture when it's rotated
            texture.anisotropy = options.anisotropy || (isMobile ? 1 : 4)
            // generateMipmaps: controls the quality of the texture when it's far away
            texture.generateMipmaps = options.generateMipmaps ?? !isMobile
            // colorSpace: controls the color space of the texture
            texture.colorSpace = options.colorSpace || THREE.SRGBColorSpace

            // Scale down the texture if it's too large, for better performance
            if (texture.image && 'toDataURL' in texture.image) {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    // Calculate optimal size based on device
                    const maxSize = isMobile ? 1024 : 2048
                    const scale = Math.min(1, maxSize / Math.max(texture.image.width, texture.image.height))

                    canvas.width = texture.image.width * scale
                    canvas.height = texture.image.height * scale

                    ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height)
                    texture.image = canvas
                }
            }
        })

        return texture
    }, [url, isMobile, options.minFilter, options.magFilter, options.anisotropy, options.generateMipmaps, options.colorSpace])
} 
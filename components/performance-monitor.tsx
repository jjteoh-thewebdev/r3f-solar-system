"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

interface PerformanceMonitorProps {
    onQualityChange: (quality: "high" | "medium" | "low") => void
}

// Performance monitor component
// Adjust quality base on frame time(time taken to render a frame)
export default function PerformanceMonitor({ onQualityChange }: PerformanceMonitorProps) {
    const frameTime = useRef(0)
    const lastTime = useRef(performance.now())
    const qualityCheckInterval = useRef(0)

    useFrame(() => {
        const currentTime = performance.now()
        const delta = currentTime - lastTime.current
        lastTime.current = currentTime

        // Calculate frame time (in milliseconds)
        frameTime.current = delta

        // Check performance every 2 seconds
        qualityCheckInterval.current += delta
        if (qualityCheckInterval.current > 2000) {
            qualityCheckInterval.current = 0

            // Adjust quality based on frame time
            if (frameTime.current > 20) { // More than 20ms per frame
                onQualityChange("low")
            } else if (frameTime.current > 16) { // More than 16ms per frame
                onQualityChange("medium")
            } else {
                onQualityChange("high")
            }
        }
    })

    return null
} 
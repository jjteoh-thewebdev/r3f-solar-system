"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./loading-screen.module.css"

interface LoadingScreenProps {
    onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const startTimeRef = useRef<number | null>(null)
    const duration = 3000 // 3 seconds for the loading screen

    useEffect(() => {
        let animationFrameId: number | null = null

        const updateProgress = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp
            }

            const elapsed = timestamp - startTimeRef.current
            const newProgress = Math.min((elapsed / duration) * 100, 100)

            setProgress(Math.floor(newProgress))

            if (newProgress < 100) {
                animationFrameId = requestAnimationFrame(updateProgress)
            } else {
                // Ensure we hit exactly 100%
                setProgress(100)
                setTimeout(onLoadingComplete, 500)
            }
        }

        animationFrameId = requestAnimationFrame(updateProgress)

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [onLoadingComplete])

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            {/* Stars background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={styles.stars} />
                <div className={styles.stars2} />
                <div className={styles.stars3} />
            </div>

            <div className="flex flex-col items-center justify-center min-h-[200px]">
                <div className={styles.loader} />

                {/* Loading text */}
                <div className="mt-8 text-white text-xl font-bold">
                    Space journey begins...
                </div>

                {/* Progress bar */}
                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-2 text-blue-300">
                    {progress}%
                </div>
            </div>
        </div>
    )
} 
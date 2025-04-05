import { useState, useEffect } from 'react'

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent))
        }

        // Check on mount
        checkMobile()

        // Add resize listener to handle orientation changes
        window.addEventListener('resize', checkMobile)

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
} 
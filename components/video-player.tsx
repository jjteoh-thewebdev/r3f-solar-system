"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface VideoPlayerProps {
    isOpen: boolean
    onClose: () => void
    videoUrl: string
    title: string
    source?: {
        creator: string
        url: string
    }
}

export default function VideoPlayer({ isOpen, onClose, videoUrl, title, source }: VideoPlayerProps) {
    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    const videoId = getYouTubeVideoId(videoUrl)
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : ""

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black text-white">
                <DialogHeader className="p-4 flex flex-row items-center justify-between">
                    <DialogTitle className="text-xl">{title}</DialogTitle>
                </DialogHeader>

                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    {videoId ? (
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={embedUrl}
                            title={`${title} Video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            Video URL is invalid or not supported
                        </div>
                    )}
                </div>

                {source && (
                    <div className="p-4 text-sm text-gray-400">
                        Video by:{" "}
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                            {source.creator}
                        </a>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}


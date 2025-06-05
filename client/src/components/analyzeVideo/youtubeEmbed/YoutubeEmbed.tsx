"use client"

import { useParams } from "next/navigation";

export default function YouTubeEmbed() {
    const params = useParams();
    const videoId = params.videoId as string;
    return (
        <div className="w-full aspect-video">
            <iframe
                className="w-[960px] h-[540px] rounded-lg border-purple-500/30 border-2"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

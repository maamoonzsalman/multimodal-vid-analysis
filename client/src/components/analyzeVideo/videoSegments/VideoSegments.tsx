"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Clock } from "lucide-react"
import axios from "axios"
import Segment from "./Segment"


export default function VideoSegments() {
    interface Segment {
        timestamp: string
        title: string
    }

    const [segments, setSegments] = useState<Segment[]>([]);
    const params = useParams();
    const videoId = params.videoId as string;
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    useEffect(() => {
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/timestamps/`);
        const getSegments = async () => {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/timestamps`,  {
                    url,
                });
                const data = res.data["json data"];
                const formatted: Segment[] = Object.entries(data).map(([timestamp, title]) => ({
                    timestamp,
                    title: String(title),
                }));
                setSegments(formatted);
            } catch (err) {
                console.log('Error fetching segments');
                console.error(err);
            }
        };
        getSegments();
    }, [url])

    return (
        <div className="bg-black/40 border-purple-500/30 backdrop-blur-sm rounded-lg w-1/5">
            
            <div className="p-4 border-b border-purple-500/30">
                <h3 className="font-semibold text-white flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>Video Sections</span>
                </h3>
            </div>
            
            <div className="p-4 h-[445px] overflow-y-auto custom-scrollbar">
                {segments.length > 0 ? (
                    <div className='space-y-3 flex flex-col'>
                        {segments.map((segment) => (
                            <Segment key={segment.timestamp} segment={segment}/>
                        ))}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>

        </div>
    )
}
import { Play } from "lucide-react";

interface SegmentProps {
    segment: {
        timestamp: string;
        title: string;
    };
};

export default function Segment({ segment }: SegmentProps) {
    const formatTime = (timestamp: string): string => {
        const [mins, secs] = timestamp.split(":").map(Number);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    
    return (
        <button
            className="w-full text-left p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-200 group"
        >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-white text-sm font-semibold">{1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {segment.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-cyan-400 text-sm font-mono">{formatTime(segment.timestamp)}</span>
                    </div>
                  </div>
                  <Play className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </button>
    )
};
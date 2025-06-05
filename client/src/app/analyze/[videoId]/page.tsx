import VideoSegments from "@/components/analyzeVideo/videoSegments/VideoSegments";
import NavBar from "@/components/NavBar";
import VideoChat from "@/components/analyzeVideo/videoChat/VideoChat";
import YouTubeEmbed from "@/components/analyzeVideo/youtubeEmbed/YoutubeEmbed";
import VisualContentSearch from "@/components/analyzeVideo/visualContent/VisualContentSearch";

export default function AnalyzePage() {
  return (
    <div className='h-screen'>
        <div className='top'>
            <NavBar/>
        </div>
        
        <div className='bottom flex flex-row justify-center items-start mt-7 '>
            <div className=''>
                <div className='mb-7'>
                    <YouTubeEmbed/>
                </div>
                <div>
                    <VisualContentSearch/>
                </div>
            </div>
            <div className='flex flex-col ml-7'>
                <VideoSegments/>
                <VideoChat/>
            </div>
        </div>
    </div>
  )
};

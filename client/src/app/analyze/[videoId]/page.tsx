import VideoSegments from "@/components/analyzeVideo/videoSegments/VideoSegments";
import NavBar from "@/components/NavBar";
import VideoChat from "@/components/analyzeVideo/videoChat/VideoChat";
import YouTubeEmbed from "@/components/analyzeVideo/youtubeEmbed/YoutubeEmbed";

export default function AnalyzePage() {
  return (
    <div className='h-screen'>
        <div className='top'>
            <NavBar/>
        </div>
        
        <div className='bottom flex flex-row justify-center items-start mt-7 '>
            <div className=''>
                <YouTubeEmbed/>
            </div>
            <div className='flex flex-col ml-7'>
                <VideoSegments/>
                <VideoChat/>
            </div>
        </div>
    </div>
  )
};

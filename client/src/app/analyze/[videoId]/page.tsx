import VideoSegments from "@/components/analyzeVideo/videoSegments/VideoSegments";
import NavBar from "@/components/NavBar";
import VideoChat from "@/components/analyzeVideo/videoChat/VideoChat";

export default function AnalyzePage() {
  return (
    <div className='h-screen'>
        <div className='top'>
            <NavBar/>
        </div>
        
        <div className='bottom h-full flex flex-col justify-center items-center '>
            <VideoSegments/>
            <VideoChat/>
        </div>
    </div>
  )
};

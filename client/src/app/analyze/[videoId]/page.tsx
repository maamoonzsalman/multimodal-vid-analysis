import VideoSegments from "@/components/analyzeVideo/videoSegments/VideoSegments";
import NavBar from "@/components/NavBar";

export default function AnalyzePage() {
  return (
    <div className='h-screen'>
        <div className='top'>
            <NavBar/>
        </div>
        
        <div className='bottom h-full flex justify-center items-center '>
            <VideoSegments/>
        </div>
    </div>
  )
};

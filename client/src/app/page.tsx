import NavBar from "@/components/NavBar"
import UploadVideoBox from "@/components/uploadVideo/UploadVideoBox"

export default function Home() {
  return (
    <div className='h-screen'>
          <div className='top'>
            <NavBar/>
          </div>

          <div className='bottom h-full flex justify-center items-center '>
            <UploadVideoBox/>
          </div>

          
    </div>
  )
};


import UploadVideoInput from './UploadVideoInput';
import { Upload, Youtube, Sparkles } from "lucide-react"


export default function UploadVideoBox() {
    return (
        <div className='uploadVideoBox w-1/4 min-h-[40vh] border-2 rounded-lg p-8 bg-black/40 border-purple-500/30 backdrop-blur-sm"'>
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-14 h-14 text-white" />
            </div>
            <div className='text-center mb-4'>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Upload Your Video
                </h2>
                <p className="text-gray-300 text-xl">Paste a YouTube URL to start analyzing your video with AI</p>
            </div>
            <div>
              <UploadVideoInput/>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-purple-500/30">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-lg flex items-center justify-center mb-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-sm text-gray-300">AI Analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-cyan-500/20 rounded-lg flex items-center justify-center mb-2">
                  <Youtube className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-sm text-gray-300">Video Chat</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-lg flex items-center justify-center mb-2">
                  <Upload className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-sm text-gray-300">Visual Search</p>
              </div>
          </div>
        </div>
    )
};
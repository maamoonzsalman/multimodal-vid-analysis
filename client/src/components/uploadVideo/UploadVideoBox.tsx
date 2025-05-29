import { Upload } from 'lucide-react';

export default function UploadVideoBox() {
    return (
        <div className='uploadVideoBox'>
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-14 h-14 text-white" />
            </div>
            <div className='text-center'>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Upload Your Video
                </h2>
                <p className="text-gray-300 text-xl">Paste a YouTube URL to start analyzing your video with AI</p>
          </div>
        </div>
    )
};
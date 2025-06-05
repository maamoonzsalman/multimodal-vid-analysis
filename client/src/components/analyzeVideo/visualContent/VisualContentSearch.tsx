import { Search, Eye } from "lucide-react";

export default function VisualContentSearch() {

    return (
        <div className="bg-black/40 border-purple-500/30 backdrop-blur-sm rounded-lg">
            
            <div className="p-4 border-b border-purple-500/30">
                <h3 className="font-semibold text-xl text-white flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-cyan-400" />
                    <span>Visual Content Search</span>
                </h3>
                <p className="text-gray-400 font-medium mt-1">Describe what you want to find in the video</p>
            </div>

            <div className="p-4 space-y-4">
                <div className="flex space-x-2">
                    <input
                        placeholder="e.g., 'person pointing at whiteboard'"
                        className="w-full text-xl py-2 px-2 rounded-lg bg-black/50 border-purple-500/50 border text-white placeholder-gray-400 focus:border-cyan-400"
                    />
                    <button
                        className=" rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                    >
                        <Search className="w-11 h-7" />
                    </button>
                </div>
            </div>

        </div>
    )
};
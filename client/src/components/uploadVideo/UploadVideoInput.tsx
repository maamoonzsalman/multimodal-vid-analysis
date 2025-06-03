'use client'

import React from "react"
import { useState } from "react"
import { Youtube } from "lucide-react"

interface FormData {
    url: string
}

export default function UploadVideoInput() {
    const [form, setForm] = useState<FormData>({
        url: ''
    });

    return (
        <>
            <form className=''>
                <div className="relative">
                    <Youtube className="mt-5 absolute left-3  transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="url"
                        name='url'
                        id='url'
                        placeholder="https://youtube.com/watch?v=..."
                        value={form.url}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value})}
                        className=" mb-4 rounded-lg border pl-12 bg-black/50 border-purple-500/50 text-white placeholder-gray-400 focus:border-cyan-400 w-full p-2 py-2"
                        required
                    />
                    
                </div>
            </form>
        </>
    )
};


"use client"

import React from "react";
import { useState } from "react";
import { Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import extractVideoId from "@/utils/extractVideoId";

interface FormData {
    url: string
}

export default function UploadVideoInput() {
    const [form, setForm] = useState<FormData>({ url: '' });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const videoId = extractVideoId(form.url)
        router.push(`/analyze/${videoId}`);
    };

    return (
        <>
            <form className='' onSubmit={ handleSubmit }>
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
                <>
                    <button
                    type="submit"
                    className="mb-4 rounded-lg w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-2"
                    >
                    Analyze Video
                    </button>
                </>
            </form>
        </>
    )
};


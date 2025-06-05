"use client"

import React, { useState } from "react";
import axios from "axios";
import { Send, Bot, User } from "lucide-react";
import { useParams } from "next/navigation";

export default function VideoChat() {
    type Message = { 
        id: string;
        role: "user" | "bot"; 
        content: string 
    };

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const params = useParams();
    const videoId = params.videoId as string;
    const [loading, setLoading] = useState(false);
    const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;



    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage: Message = {
            id: generateId(),
            role: "user", 
            content: input 
        }
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true)

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${videoId}`, {
                inquiry: input
            });
            const botResponse = res.data["json data"].response;
            const botMessage: Message = {
                id: generateId(),
                role: "bot", 
                content: botResponse 
            }
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error('Error sending message: ', err);
        }

        setInput("");
        setLoading(false);
    } 

    return (
        <div className="h-[500px] w-1/5 rounded-lg mt-6 bg-black/40 border-purple-500/30 backdrop-blur-sm flex flex-col">
            
            <div className="p-4 border-b border-purple-500/30">
                <h3 className="font-semibold text-xl text-white flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-cyan-400" />
                    <span>Video Chat</span>
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                                message.role === "user"
                                ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                                : "bg-gray-800/80 text-gray-100 border border-gray-700"
                            }`}
                        >
                            <div className="flex items-start space-x-2">
                                {message.role === "bot" && <Bot className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />}
                                {message.role === "user" && <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />}
                                <div className="flex-1">
                                    <p className="text-lg">{message.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
        ))}
                
                
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                                <Bot className="w-4 h-4 text-cyan-400" />
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>

            <div className="p-4 border-t border-purple-500/30">
                <div className="flex space-x-2 w-full">
                    <input
                        placeholder="Ask about the video content..."
                        className="w-full py-2 px-2 rounded-lg bg-black/50 border-purple-500/50 text-white
                        placeholder-gray-400 focus:border-cyan-400 border text-xl"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        disabled={loading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="hover:pointer rounded-lg p-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                    >
                        <Send className="w-7 h-7 rounded-lg" />
                    </button>
                </div>
            </div>

        </div>
    )
};
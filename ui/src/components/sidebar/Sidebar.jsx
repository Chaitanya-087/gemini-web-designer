import React, { useEffect, useState } from "react"
import SidebarChatList from "./SidebarChatList";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const USERID = 124 // hardcoded for now

export default function Sidebar() {
    const [chats, setChats] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            const res = await fetch(`http://localhost:8080/chats/users/${USERID}/all`);
            const data = await res.json();
            setChats(data);
        };
        fetchChats();
    }, [])

    return (
        <aside className={`relative z-50 transition-all duration-300 ${expanded ? 'w-[260px]' : 'w-0'}`}>
            <div className={`h-screen overflow-hidden flex flex-col border-r shadow-sm bg-white`}>

                {/* heading */}
                <div className="p-3 flex gap-7 items-center justify-items-start">
                    <button onClick={() => setExpanded(prev => !prev)} className="p-2 rounded-lg border hover:bg-gray-100">
                        {expanded ? <FaChevronLeft size={15} /> : <FaChevronRight size={15} />}
                    </button>
                    <img src="https://img.logoipsum.com/243.svg" className={`transition-all w-28`} alt="" />
                </div>

                {/* create new chat */}
                <div className="px-3 flex flex-col gap-1 flex-1">
                    
                    <div className="p-2 flex items-center gap-2 font-semibold rounded-lg cursor-pointer 
                bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800">
                        <FaPlus size={15} />
                        <span className="text-nowrap overflow-hidden transition-all">Create New Chat</span>
                    </div>

                    {/* chats list */}
                    <SidebarChatList chats={chats} />
                </div>

                <div className="border-t flex p-3 gap-2">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div className="flex justify-between items-center overflow-hidden transition-all">
                        <div className="leading-4">
                            <h4 className="font-semibold">John Doe</h4>
                            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -z-20 top-3 left-3 p-2 rounded-lg cursor-pointer border hover:bg-gray-100" onClick={() => setExpanded(prev => !prev)}>
                <FaChevronRight size={15} />
            </div>
        </aside>
    )
}
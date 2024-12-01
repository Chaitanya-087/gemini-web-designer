import React, { useState, createContext, useMemo } from "react"
import SidebarChatList from "./SidebarChatList";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

export const SidebarContext = createContext(null);

export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);

    const toggleExpanded = () => {
        setExpanded(prev => !prev);
    }

    const contextValue = useMemo(() => ({ expanded }), [expanded]);

    return (
        <aside className={`relative z-50 transition-all duration-300 ${expanded ? 'w-[260px] min-w-[260px] max-w-[260px]' : 'w-0 min-w-0 max-w-0'}`}>

            <div className={`h-screen flex flex-col border-r shadow-sm bg-white`}>

                {/* heading */}
                <div className="p-3 flex gap-7 items-center justify-items-start">
                    <button onClick={toggleExpanded} className="p-2 rounded-lg border hover:bg-gray-100">
                        {expanded ? <FaChevronLeft size={15} /> : <FaChevronRight size={15} />}
                    </button>
                    <img src="https://img.logoipsum.com/243.svg" className={`transition-all w-28`} alt="" />
                </div>

                <div className="px-3 w-full flex flex-col gap-1 flex-1">

                    {/* create new chat */}
                    <div className="overflow-hidden rounded-lg cursor-pointer 
                                    bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800">
                        <div className="flex h-10 ml-4 items-center gap-2 font-semibold">
                            <FaPlus size={15} />
                            <span className="text-nowrap overflow-hidden transition-all">Create New Chat</span>
                        </div>
                    </div>
                    <SidebarContext.Provider value={contextValue}>
                        {/* chats list */}
                        <SidebarChatList />
                    </SidebarContext.Provider>
                </div>

                <div className="border-t">
                    <div className="flex h-14 w-[90%] m-auto items-center gap-2">
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
            </div>
            <button
                className="absolute -z-20 top-3 left-3 p-2 rounded-lg cursor-pointer border hover:bg-gray-100"
                onClick={() => setExpanded(prev => !prev)}
                aria-label="Expand Sidebar"
                type="button"
            >
                <FaChevronRight size={15} />
            </button>
        </aside>
    )
}
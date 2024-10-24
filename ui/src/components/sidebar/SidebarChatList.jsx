import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarChatList({ chats }) {
    return (
        <nav className="mt-4 overflow-hidden flex-col flex-1 relative transition-all">
            <div className="sticky top-0 z-20">
                <span className='flex items-center'>
                    <h3 className='text-sm truncate  font-semibold'>Chats</h3>
                </span>
            </div>
            <ul className='flex-col gap-1'>
                {chats.toReversed().map(chat => {
                    return (
                        <Link to={`/c/${chat.id}`} className='p-2 flex cursor-pointer rounded-md hover:bg-indigo-50 text-gray-700' key={chat.id} title={chat.name}>
                            <li>
                                <p className='text-sm font-semibold truncate'>{chat.name}</p>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </nav>
    )
}


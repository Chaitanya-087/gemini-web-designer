import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';

const USERID = 124; // hardcoded for now

export default function SidebarChatList() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            const res = await fetch(`http://localhost:8080/chats/users/${USERID}/all`);
            const data = await res.json();
            setChats(data);
        };
        fetchChats();
    }, []);

    return (
        <nav className="mt-4 flex-col flex-1 relative transition-all">
            <h3 className='text-sm truncate font-semibold mb-2'>Chats</h3>
            <ul className='flex flex-col gap-1'>
                {chats.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(chat => (
                    <ChatItem key={chat.id} chat={chat} />
                ))}
            </ul>
        </nav>
    );
}

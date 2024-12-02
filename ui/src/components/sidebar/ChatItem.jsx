import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Options from './Options';

ChatItem.propTypes = {
    chat: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

function ChatItem({ chat }) {
    const { chatId: selectedChatId } = useParams();
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    return (
        <li className={`cursor-pointer group relative hover:bg-indigo-100 transition-all duration-75 rounded-md ${chat.id === selectedChatId || isOptionsOpen ? 'bg-indigo-100' : ''}`}>
            <div className="w-[90%] h-9 flex items-center m-auto">
                <Link
                    to={`/c/${chat.id}`}
                    className="flex-1 relative truncate text-sm font-medium text-gray-700"
                    title={chat.name}
                >
                    {chat.name}
                </Link>
                <Options
                    chatId={chat.id}
                    isOpen={isOptionsOpen}
                    onToggle={() => setIsOptionsOpen(prev => !prev)}
                    onClose={() => setIsOptionsOpen(false)}
                />
            </div>
        </li>
    );
}

export default ChatItem;

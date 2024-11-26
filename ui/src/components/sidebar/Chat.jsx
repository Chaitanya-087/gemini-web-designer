import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { SidebarContext } from "./Sidebar";

/* icons */
import { MdDelete, MdEdit } from 'react-icons/md';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

Chat.propTypes = {
    chat: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default function Chat({ chat }) {
    const { chatId } = useParams();
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    return (
        <li className={`cursor-pointer group relative hover:bg-indigo-100 transition-all duration-75 rounded-md ${chat.id === chatId || isOptionsOpen ? 'bg-indigo-100' : ''}`}>
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
                    isOptionsOpen={isOptionsOpen}
                    setIsOptionsOpen={setIsOptionsOpen}
                />
            </div>
        </li>
    );
}

Options.propTypes = {
    chatId: PropTypes.string.isRequired,
    isOptionsOpen: PropTypes.bool.isRequired,
    setIsOptionsOpen: PropTypes.func.isRequired,
};

function Options({ chatId, isOptionsOpen, setIsOptionsOpen }) {
    const { expanded } = useContext(SidebarContext);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const { chatId: currentChatId } = useParams();

    const toggleDropdown = useCallback((e) => {
        e.stopPropagation();
        setIsOptionsOpen(prev => !prev);
    }, [setIsOptionsOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOptionsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOptionsOpen]);

    const isDropdownVisible = isOptionsOpen || (currentChatId === chatId && expanded);

    return (
        <div className={`relative ${isDropdownVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} title="options">
            <button ref={buttonRef} onClick={toggleDropdown}>
                <HiOutlineDotsHorizontal size={15} className="text-gray-700 cursor-pointer" />
            </button>
            {isOptionsOpen && (
                <DropdownMenu dropdownRef={dropdownRef} />
            )}
        </div>
    );
}

function DropdownMenu({ dropdownRef }) {
    return (
        <div
            ref={dropdownRef}
            className="absolute overflow-hidden transition-transform duration-50 transform origin-top-left object-left-bottom bg-white border border-gray-200 shadow-lg rounded-md text-nowrap z-20"
        >
            <DropdownItem icon={MdDelete} label="Delete" className="text-red-600" />
            <hr />
            <DropdownItem icon={MdEdit} label="Rename" />
        </div>
    );
}

DropdownMenu.propTypes = {
    dropdownRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

function DropdownItem({ icon: Icon, label, className }) {
    return (
        <button className={`flex items-center w-full text-left gap-1 text-sm px-2 py-1 hover:bg-gray-100 ${className || ''}`}>
            <Icon className="relative top-[0.85px]" />
            <span className="font-semibold">{label}</span>
        </button>
    );
}

DropdownItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};

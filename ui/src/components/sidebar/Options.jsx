import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { SidebarContext } from './Sidebar';
import { DropdownMenu, DropdownItem } from '../common';

import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdDelete, MdEdit } from 'react-icons/md';

function Options({ chatId, isOpen, onToggle, onClose }) {
    const { expanded } = useContext(SidebarContext);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const { chatId: currentChatId } = useParams();

    const isChatActive = currentChatId === chatId && expanded;

    const toggleDropdown = useCallback(
        (e) => {
            e.stopPropagation();
            onToggle();
        },
        [onToggle]
    );

    const handleClickOutside = useCallback((event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    const isOptionsVisible = isOpen || isChatActive;

    return (
        <div className={`relative ${isOptionsVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <button ref={buttonRef} onClick={toggleDropdown} className="focus:outline-none">
                <HiOutlineDotsHorizontal size={15} className="text-gray-700" />
            </button>
            {isOpen && (
                <DropdownMenu ref={dropdownRef}>
                    <DropdownItem icon={MdDelete} label="Delete" className="text-red-600" />
                    <hr />
                    <DropdownItem icon={MdEdit} label="Rename" className="text-black" />
                </DropdownMenu>
            )}
        </div>
    );
}

Options.propTypes = {
    chatId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Options;

import React from 'react';
import PropTypes from 'prop-types';

const DropdownItem = ({ icon: Icon, label, className }) => {
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

export default DropdownItem;
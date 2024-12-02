import React from 'react';
import PropTypes from 'prop-types';

const DropdownMenu = React.forwardRef(({ children }, ref) => (
    <div
        ref={ref}
        className="absolute overflow-hidden transition-transform duration-50 transform origin-top-left object-left-bottom bg-white border border-gray-200 shadow-lg rounded-md text-nowrap z-20"
    >
        {children}
    </div>
));

DropdownMenu.propTypes = {
    children: PropTypes.node.isRequired,
    ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default DropdownMenu;

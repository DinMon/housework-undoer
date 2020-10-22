import React from 'react'

function NavButton({ selected, onClick, children, className = '', ...rest}) {
    return (
        <button type='button' onClick={onClick} className={`nav-btn ${selected ? 'selected' : ''} ${className}`} {...rest}>
            {children}
        </button>
    )
}

export default NavButton
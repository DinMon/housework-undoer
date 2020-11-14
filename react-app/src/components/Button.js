import React from 'react'

function Button({ children, onClick, isLoading, className}) {
    return (
        <button className={`${className}`} onClick={onClick}>{isLoading ? (
            <div className='btn-spinner'></div>
        ) : children}</button>
    )
}

export default Button
import React from 'react'

function Card({ children, colour, className, ...rest}) {
    return (
        <div className={`card ${className}`} style={{ backgroundColor: colour }} {...rest}>
            {children}
        </div>
    )
}

export default Card
import React from 'react'

const Card = React.forwardRef(({ children, colour, className, ...rest}, ref) => {
    return (
        <div ref={ref} className={`card ${className}`} style={{ backgroundColor: colour }} {...rest}>
            {children}
        </div>
    )
});

export default Card
import React, { useState, useEffect } from 'react'
import NavButton from './NavButton'

function PageNavigator({ children, menuItems = [] }) {
    const [indexSelected, setIndexSelected] = useState(0)

    useEffect(() => {
        if (children && children.length !== menuItems.length) {
            console.warn("The number of children do not match number of menu items passed in.")
        }
    }, [children, menuItems])

    function handleBtnClick(index) {
        setIndexSelected(index)
    }

    return (
        <div className='navbar'>
            {menuItems && menuItems.map((menuItem, index) => {
                return (
                    <NavButton key={index} onClick={() => handleBtnClick(index)} selected={index === indexSelected}>
                        {menuItem}
                    </NavButton>
                )
            })}
            {children && children.length > indexSelected && children[indexSelected]}
        </div>
    )
}

export default PageNavigator
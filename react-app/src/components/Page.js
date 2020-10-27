import React from 'react'

function Page({ children, isLoading}) {
    return (
        <div className='page'>
            {isLoading ? (
                <div className='loader-container'>
                    <div className='loader'></div>
                </div>
            ) : (
                children
            )}
        </div>
    )
}

export default Page
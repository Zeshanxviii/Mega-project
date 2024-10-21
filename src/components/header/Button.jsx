import React from 'react'

function Button(
    {
        children,
        type = 'button',
        classname = '',
        bgColor = 'bg-blue-600',
        textColor = 'text-white',
        ...props
    }
) 
{
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${classname}`}{...props}>
            {children}
        </button>
)
}

export default Button
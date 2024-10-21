import React, {useId , forwardRef} from 'react'

function Select({
    options,
    label,
    className,
    ...props
},ref) {
    const Id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={Id} className=''></label>}
            <select {...props} id={Id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 
            border border-gray-200 w-full${className}`}>
                {options?.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)
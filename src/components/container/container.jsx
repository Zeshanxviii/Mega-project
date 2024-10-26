import React from 'react';

function Container({ children }) {  // Change 'Children' to 'children'
    return (
        <div className='w-full max-w-7xl mx-auto px-4'>
            {children}  {/* Use 'children' here */}
        </div>
    );
}

export default Container;

import React from 'react'
import {Link } from 'react-router-dom'
import service from '../../appwrite/config.service'

function PostCard({$id , title , content, featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getfilePreview(featuredImage)} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold '>{title}</h2>
                    {content}
            </div>
        </Link>
    )
}

export default PostCard
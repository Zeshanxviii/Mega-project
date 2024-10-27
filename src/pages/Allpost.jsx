import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import service from '../appwrite/config.service'

function Allpost() {
    const [post, setPost] = useState([])
    useEffect(() => {
        service.getALlPost([])
            .then((value) => {
                if (value) {
                    setPost(value.documents)
                }
            })
    }, [])


return (
    <div className='w-full py-8'>
        <Container className='flex flex-wrap'>
            {post.map((post) => (   
                <div key={post.$id}>
                    <PostCard title={post.title} featuredImage={post.featuredImage} $id={post.$id} content={post.content} />
                </div>
            ))}
        </Container>
    </div>
)
    

}

export default Allpost
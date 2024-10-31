import React, {useEffect, useState} from 'react'
import service from "../appwrite/config.service";
import {Container, PostCard} from '../components/index'
import { useSelector } from 'react-redux';


function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state)=> state.auth.status)
      
    useEffect(() => {
        service.getPosts().then((posts) => {
            console.log(posts)            
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [authStatus])
    if(posts.length== 0)
    {
        return(
            <div className='flex justify-center items-center h-screen'>
            <h1 className='text-center text-8xl font-sans font-bold'>Login to Read Post</h1>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
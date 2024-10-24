import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Service from '../appwrite/config.service'
import { Container, PostCard, PostForm } from '../components/index'
import service from '../appwrite/config.service'

function EditPost() {
    const { slug } = useParams()
    const [post, setPost] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            if (slug) {
                service.getpost(slug)
                    .then((value) => {
                        if (value)
                            setPost(value)
                    })
            }
            else {
                navigate('/')
            }
        }, [slug, navigate]
    )

    return post ? <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div> : null
}

export default EditPost
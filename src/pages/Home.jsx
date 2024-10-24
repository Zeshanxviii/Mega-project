import React, {useEffect ,useState} from 'react'
import { Container, PostCard} from '../components/index'
import service from '../appwrite/config.service'


function Home() {
    const [post , setPost] = useState([])
    useEffect(()=>{
        service.getpost()
        .then((value) => {
            if(value)
            setPost(value)
        })
    },[])
  if(post.length === 0)
  {
    return (
<div className='p-8 w-full'>
    <Container>
        <div className='flex text-center justify-center'>
            <h1>Login to read post</h1>
        </div>
    </Container>
</div>)
}
else{
    return <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {post.map(
                    (post) => {
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    }
                )}
            </div>
        </Container>
    </div>
}
}

export default Home
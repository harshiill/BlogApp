import React, { useEffect, useState } from 'react'
import service from '../Appwrite/config'
import Postcard from '../Components/Postcard'
import Container from '../Components/container/Container'
function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([])
        .then(posts => {
           if(posts) {
               setPosts(posts.documents)
           }
        }).catch(error => {
            console.error(error)
        })
    }, [])
  return (
    <div className='w-full py-8 '> 
    <Container>
    <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
    </Container>
    </div>
  )
}

export default AllPost
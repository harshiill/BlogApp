import React, { useEffect, useState } from 'react'
import { Container } from '../Components'
import PostForm from '../Components/post-form/Post-Form'
import service from '../Appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState([])
    const {slug}=useParams()   
const navigate=useNavigate() 

useEffect(() => {
    if(slug)
    {
        service.getPost(slug).then((post) =>
        {
            if(post)
            {
                setPost(post)
            }
        })
    }
    else{
        navigate('/')
    }
},[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm {...post} />    
        </Container>
    </div>
  ) : null
}

export default EditPost
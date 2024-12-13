
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.jsx'
import store from './Store/Store.js'
import Home from './pages/Home.jsx'
import Signup from './../src/pages/Signup.jsx'
import AllPost from './../src/pages/AllPost.jsx'
import AddPost from './../src/pages/AddPost.jsx'
import EditPost from './../src/pages/EditPost.jsx'
import Post from './../src/pages/Post.jsx'
import Protected from './Components/AuthLayout.jsx'







const router=createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>,

      },
      {
        path: '/login',
        element : (
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
            <Protected authentication={false}>
                <Signup />
            </Protected>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <Protected authentication>
                {" "}
                <AllPost />
            </Protected>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Protected authentication>
                {" "}
                <AddPost />
            </Protected>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Protected authentication>
                {" "}
                <EditPost />
            </Protected>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },

    ] 
  }
])
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>



  </React.StrictMode>
)

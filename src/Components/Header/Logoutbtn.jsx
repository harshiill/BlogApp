import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/authSlice';
import authService from './../../Appwrite/auth';



function Logoutbtn() {
    const dispatch = useDispatch();
    const logouthandler=() => {
        authService.logout()
        .then(() => {
            dispatch(logout());
        })
        .catch((error) => {
            console.error('Error logging out:', error);
        });
    }

  return (
<button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logouthandler}
    >Logout</button>)
}

export default Logoutbtn
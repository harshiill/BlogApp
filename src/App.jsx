import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { login, logout } from './Store/authSlice';
import authService from './Appwrite/auth';
import { Footer } from './Components';
import { Header } from './Components';
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true); // Manages loading state
  const dispatch = useDispatch(); // Redux dispatch hook

  useEffect(() => {
    // Fetch the current user
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData})); // Log the user in
        } else {
          dispatch(logout()); // Log the user out
        }
        setLoading(false); // Loading complete
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false); // Ensure loading is stopped on error
      });
  }, [dispatch]);

  if (loading) {
    return <div className="loading-screen">Loading...</div>; // Add class for styling
  }

  return (
    <div className="min-h-screen flex flex-wrap content-between  bg-gray-400">
      <div className='w-full block'>
        <Header />
        <main>
         TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

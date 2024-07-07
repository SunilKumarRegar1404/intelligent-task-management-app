// frontend/src/pages/Profile.tsx
import { SignedIn, UserButton, useUser } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';
import React from 'react';


const Profile = () => {
    const { signOut } = useClerk();
    const { isSignedIn, user, isLoaded } = useUser(); 

    const handleLogout = () => {
        signOut();
      };

    
     if (!isLoaded) {
    // Handle loading state however you like
    return <div className="text-2xl text-blue-500 font-bold mb-4">Loading...</div>;
  }

  if (isSignedIn) {
    console.log(user.id);
    return (
      <div className='h-full w-full flex justify-center text-center relative top-[20%]'>
          <SignedIn>
              <span>
          <h1 className="text-2xl text-blue-400 font-bold mb-2">HELLO, {user.firstName}!</h1>
          <img src={user.imageUrl} className='h-[20vh] w-[20vh] rounded-full m-4 border-2 border-yellow-700  '/>

          {/* <UserButton/> */}

          <button
      onClick={handleLogout}
      className="text-white text-2xl border-2  border-blue-400 mt-2  rounded-full px-4 py-2 transition duration-300"
    >
      Logout
    </button>
              </span>
          </SignedIn>
      </div>
    );
  }

  return <div className='text-2xl text-red-600 font-bold mb-4' >Not signed in</div>;

};

export default Profile;

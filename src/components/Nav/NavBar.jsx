import React from 'react';
import Logo from '../../assets/react.svg';

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-black text-white"> {/* Changed to a darker blue */}
      <div className="flex items-center">
        <img src={Logo} alt="React logo" className="h-8 mr-2" />
        <h1 className="text-xl font-bold">G-AI Bot</h1>
      </div>
      <div className="space-x-4">
        <a href="/" className="hover:text-blue-300">Home</a>
        <a href="/about" className="hover:text-blue-300">About</a>
      </div>
    </div>
  );
};

export default NavBar;


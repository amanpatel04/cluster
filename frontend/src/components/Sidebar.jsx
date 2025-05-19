import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MdOutlineClose, MdOutlineDashboard, MdOutlineMenu, MdOutlineMenuOpen } from 'react-icons/md';
import { CiImageOn, CiVideoOn, CiSettings, CiLogout } from 'react-icons/ci';
import { LiaFileAudio } from 'react-icons/lia';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { BsFiles } from 'react-icons/bs';

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`h-full w-48 fixed bg-green-50 z-10 ease-linear duration-300 shadow-lg top-0 pt-10`} style={{left : isOpen ? "0%" : "-12rem"}}>
        <div className='bg-green-50 w-10 h-10 flex justify-center items-center absolute left-full hover:cursor-pointer top-1/3 bg-[rgb(0,255,0,0.1)]' onClick={toggleSidebar}>
          <button className='text-2xl text-green-500'>
            {isOpen ? <MdOutlineClose /> : <MdOutlineMenuOpen />}
          </button>
        </div>
        <div className="w-full h-3/5">
          <div className="grid gap-1 grid-rows-9 h-full items-center">
            <Link
              to="/menu"
              className="text-3xl w-full h-full m-0 aspect-square items-center font-bold pl-2 text-green-500 hidden"
            >
              <MdOutlineMenu /> <span className="text-lg font-medium ml-2">Menu</span>
            </Link>
            <Link
              to="/"
              className="text-3xl w-full h-full m-0 aspect-square flex items-center font-bold pl-2 text-green-500 bg-white"
            >
              <MdOutlineDashboard /> <span className="text-lg font-medium ml-2">Dashboard</span>
            </Link>
            <Link
              to="/image"
              className="text-3xl w-full h-full m-0 aspect-square flex items-center font-bold pl-2 text-green-500"
            >
              <CiImageOn /> <span className="text-lg font-medium ml-2">Image</span>
            </Link>
            <Link
              to="/audio"
              className="text-3xl w-full h-full m-0 aspect-square flex items-center font-bold pl-2 text-green-500"
            >
              <LiaFileAudio /> <span className="text-lg font-medium ml-2">Audio</span>
            </Link>
            <Link
              to="/video"
              className="text-3xl w-full h-full m-0 aspect-square flex items-center font-bold pl-2 text-green-500"
            >
              <CiVideoOn /> <span className="text-lg font-medium ml-2">Video</span>
            </Link>
            <Link
              to="/other"
              className="text-3xl w-full h-full m-0 aspect-square flex items-center font-bold pl-2 text-green-500"
            >
              <BsFiles /> <span className="text-lg font-medium ml-2">Other</span>
            </Link>
            <Link
              to="/upload"
              className="text-3xl w-full h-full m-0 aspect-square flex items-center font-bold pl-2 text-green-500"
            >
              <IoCloudUploadOutline /> <span className="text-lg font-medium ml-2">Upload</span>
            </Link>
            <Link
              to="/setting"
              className="text-3xl w-full h-full m-0 aspect-square flex items-center font-bold pl-2 text-green-500"
            >
              <CiSettings /> <span className="text-lg font-medium ml-2">Setting</span>
            </Link>
            <Link
              to="/logout"
              className="text-3xl w-full h-full m-0 aspect-square flex items-center font-bold pl-2 text-green-500"
            >
              <CiLogout /> <span className="text-lg font-medium ml-2">Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

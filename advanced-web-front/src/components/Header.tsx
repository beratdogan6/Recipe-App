"use client";

import React from 'react';
import { ModeToggle } from './ModeToggle';
import UserAvatar from './UserAvatar';

const Header: React.FC = () => {
  return (
    <header className='flex justify-between items-center px-[5%] py-[25px]'>
      <div>
        <a href="/" className="flex items-center text-lg font-medium">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            RECIPER.
          </div>
        </a>
      </div>
      <div>
        <nav>
          <ul className='flex gap-10 items-center'>
            <li>
              <UserAvatar />
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

"use client";

import React from 'react';
import { useUser } from '@/contexts/UserContext';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserAvatar: React.FC = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer w-16 h-16'>
          <AvatarImage
            src={user?.gender === 'man' || user?.gender === 'Man'
              ? '/assets/images/user_man_icon.png'
              : '/assets/images/user_woman_icon.png'}
            alt={user?.name}
          />
          <AvatarFallback>BD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.name + ' ' + user?.surname}</DropdownMenuLabel>
        <DropdownMenuLabel className='font-extralight text-sm -mt-3'>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a href="/recipe/add" className='w-full h-full'>
              Add Recipe
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <a href='/sign-in'>Login/Register</a>
  );
};

export default UserAvatar;

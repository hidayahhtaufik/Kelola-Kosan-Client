import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <AiIcons.AiFillProfile />,
    cName: 'nav-text',
  },
  {
    title: 'Tenant',
    path: '/tenant',
    icon: <AiIcons.AiFillSmile />,
    cName: 'nav-text',
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: <AiIcons.AiFillCalendar />,
    cName: 'nav-text',
  },
  {
    title: 'Gallery',
    path: '/gallery',
    icon: <IoIcons.IoMdPhotos />,
    cName: 'nav-text',
  },
];

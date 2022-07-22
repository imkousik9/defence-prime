import React from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';

import {
  HomeIcon,
  PlayIcon,
  HeartIcon,
  ClockIcon,
  FolderAddIcon
} from '@heroicons/react/outline';

import style from './Sidebar.module.css';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className={style.sidebar}>
      <ul>
        <li>
          <NextLink href="/">
            <a className={clsx(style.sidebar_option, style.active)}>
              <HomeIcon className={style.sidebar_icon} />
              <span>Home</span>
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/playlist">
            <a className={style.sidebar_option}>
              <PlayIcon className={style.sidebar_icon} />
              <span>Playlist</span>
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/liked">
            <a className={style.sidebar_option}>
              <HeartIcon className={style.sidebar_icon} />
              <span>Liked</span>
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/watch-later">
            <a className={style.sidebar_option}>
              <FolderAddIcon className={style.sidebar_icon} />
              <span>Watch Later</span>
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/history">
            <a className={style.sidebar_option}>
              <ClockIcon className={style.sidebar_icon} />
              <span>History</span>
            </a>
          </NextLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import {
  HomeIcon,
  PlayIcon,
  HeartIcon,
  ClockIcon,
  FolderAddIcon
} from '@heroicons/react/outline';
import {
  HomeIcon as HomeSolidIcon,
  PlayIcon as PlaySolidIcon,
  HeartIcon as HeartSolidIcon,
  ClockIcon as ClockSolidIcon,
  FolderAddIcon as FolderAddSolidIcon
} from '@heroicons/react/solid';

import style from './Sidebar.module.css';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const router = useRouter();

  const pathRoute = router?.pathname;

  return (
    <div className={clsx(style.sidebar, open && style.sidebar_open)}>
      <ul>
        <li>
          <NextLink href="/">
            <a
              className={clsx(
                style.sidebar_option,
                pathRoute === '/' && style.active
              )}
            >
              {pathRoute === '/' ? (
                <HomeSolidIcon className={style.sidebar_icon} />
              ) : (
                <HomeIcon className={style.sidebar_icon} />
              )}

              <span>Home</span>
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/playlist">
            <a
              className={clsx(
                style.sidebar_option,
                pathRoute === '/playlist' && style.active
              )}
            >
              {pathRoute === '/playlist' ? (
                <PlaySolidIcon className={style.sidebar_icon} />
              ) : (
                <PlayIcon className={style.sidebar_icon} />
              )}
              <span>Playlist</span>
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/liked-videos">
            <a
              className={clsx(
                style.sidebar_option,
                pathRoute === '/liked-videos' && style.active
              )}
            >
              {pathRoute === '/liked-videos' ? (
                <HeartSolidIcon className={style.sidebar_icon} />
              ) : (
                <HeartIcon className={style.sidebar_icon} />
              )}
              <span>Liked</span>
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/watch-later">
            <a
              className={clsx(
                style.sidebar_option,
                pathRoute === '/watch-later' && style.active
              )}
            >
              {pathRoute === '/watch-later' ? (
                <FolderAddSolidIcon className={style.sidebar_icon} />
              ) : (
                <FolderAddIcon className={style.sidebar_icon} />
              )}
              <span>Watch Later</span>
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/history">
            <a
              className={clsx(
                style.sidebar_option,
                pathRoute === '/history' && style.active
              )}
            >
              {pathRoute === '/history' ? (
                <ClockSolidIcon className={style.sidebar_icon} />
              ) : (
                <ClockIcon className={style.sidebar_icon} />
              )}
              <span>History</span>
            </a>
          </NextLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

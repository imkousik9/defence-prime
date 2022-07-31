import NextLink from 'next/link';

import { MenuIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/solid';

import style from './Navbar.module.css';
import { useAuth } from 'lib';

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className={style.navbar}>
      <div className={style.navbar_main}>
        <div className={style.navbar_left}>
          <MenuIcon className={style.menu_icon} />
          <div className="">
            <h2 className="">defence prime</h2>
          </div>
        </div>
        <div className={style.navbar_search}>
          <SearchIcon className={style.search_icon} />
          <input
            type="text"
            name="search"
            className={style.search_bar}
            placeholder="Search for video"
            id=""
          />
        </div>

        {user ? (
          <div className={style.navbar_auth}>
            <NextLink href="/profile">
              <a className={style.navbar_profile}>
                <UserCircleIcon className={style.login_icon} />
              </a>
            </NextLink>

            <div
              className={style.navbar_auth_link}
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </div>
          </div>
        ) : (
          <NextLink href="/login">
            <a className={style.navbar_auth_link}>Login</a>
          </NextLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

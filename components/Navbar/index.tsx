import { MenuIcon, SearchIcon, LoginIcon } from '@heroicons/react/outline';

import style from './Navbar.module.css';

const Navbar = () => {
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
        <div>
          <LoginIcon className={style.login_icon} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

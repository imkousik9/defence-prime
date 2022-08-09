import { ReactNode, FC, useState } from 'react';
import Head from 'next/head';

import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';

import style from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>defence prime</title>
      </Head>

      <Navbar setOpen={setOpen} />
      <main className={style.container}>
        <Sidebar open={open} />
        {children}
      </main>
    </>
  );
};

export default Layout;

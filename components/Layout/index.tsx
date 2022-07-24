import { ReactNode, FC } from 'react';
import Head from 'next/head';

import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';

import style from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>defence prime</title>
      </Head>

      <Navbar />
      <main className={style.container}>
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default Layout;

import React from 'react';
import { BottomBar } from '../BottomBar/BottomBar';
import { Navbar } from '../Navbar/Navbar';
import './style.css';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children, searchData }) => {
  const location = useLocation();
  return (
    <>
      <Navbar searchData={(value) => searchData(value)} />
      <main id="content" style={{ backgroundColor: `` }}>
        {children}
      </main>
      <BottomBar />
    </>
  );
};

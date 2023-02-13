import React from 'react';
import { BottomBar } from '../BottomBar/BottomBar';
import { Navbar } from '../Navbar/Navbar';
import './style.css';

export const Layout = ({ children, searchData }) => {
  return (
    <>
      <Navbar searchData={(value) => searchData(value)} />
      <main id="content" style={{ backgroundColor: `#ffffff` }}>
        {children}
      </main>
      <BottomBar /> 
    </>
  );
};

import React from 'react';
import { BottomBar } from '../BottomBar/BottomBar';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import './style.css';

export const Dashboard = ({ children, user }) => {
  return (
    <>
      <Navbar />
      <main id="content" style={{ background: '#f5f5f5' }}>
        <div className="row">
          <div className="col-2 col-md-4 col-lg-3 sidebar pt-5 min-h-100">
            <div className="row d-flex justify-content-end row-content">
              <Sidebar user={user} />
            </div>
          </div>
          <div className="col-10 pe-4 offset-2 ps-1 offset-md-4 offset-lg-3 col-md-8 col-lg-9 pt-5">
            <div className="container ps-0 pb-5 ">
              <div className="row">
                <div className="col-12 col-sm-11 main-section">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomBar />
    </>
  );
};

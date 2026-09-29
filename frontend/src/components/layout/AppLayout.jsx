import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout = ({ searchQuery, onSearchChange }) => {

  return (
    <div className="flex flex-col h-screen bg-[#F7F8FA] dark:bg-slate-950 overflow-hidden transition-colors">
      <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <main className="flex-1 overflow-y-auto">
        <Outlet context={{ searchQuery, onSearchChange }} />
      </main>
    </div>
  );
};

export default AppLayout;

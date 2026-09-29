import React from 'react';
import { User, Users } from 'lucide-react';

const Header = ({ activeUser, setActiveUser, progress }) => {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-500">
          Java Full Stack 30-Day Tracker
        </h1>
        <p className="text-slate-400 text-sm">Track your progress together to the finish line</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
        {/* User Toggle */}
        <div className="flex bg-slate-800 p-1 rounded-lg w-full md:w-auto">
          <button
            onClick={() => setActiveUser('user_a')}
            className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-md transition-all ${
              activeUser === 'user_a' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            <User size={16} />
            <span className="font-medium text-sm">Lộc (A)</span>
          </button>
          <button
            onClick={() => setActiveUser('user_b')}
            className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-md transition-all ${
              activeUser === 'user_b' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            <Users size={16} />
            <span className="font-medium text-sm">Hưng (B)</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

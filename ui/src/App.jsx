import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className="flex relative">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default App;
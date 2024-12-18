'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './SidebarMenu.module.css';

export default function SidebarMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const sidebarState = localStorage.getItem('sidebarOpen');
    if (sidebarState) {
      setIsSidebarOpen(JSON.parse(sidebarState));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => {
      const newState = !prevState;
      localStorage.setItem('sidebarOpen', JSON.stringify(newState));
      return newState;
    });
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    localStorage.setItem('sidebarOpen', 'false'); 
  };

  const handleLinkClick = () => {
    closeSidebar();
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {}
      <button
        onClick={toggleSidebar}
        className={styles.toggleButton}
      >
        {isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
      </button>

      {}
      {isSidebarOpen && (
        <div className={styles.sidebar}>
          <button 
            onClick={closeSidebar} 
            className={styles.closeButton}
          >
            <span className={styles.closeIcon}>X</span>
          </button>
          <ul>
            <li><Link href="/" onClick={handleLinkClick}>Inicio</Link></li>
            <li><Link href="/clientes" onClick={handleLinkClick}>Clientes</Link></li>
            <li><Link href="/proyectos/pages/proyectos" onClick={handleLinkClick}>Proyectos</Link></li>
          </ul>
        </div>
      )}
    </>
  );
}

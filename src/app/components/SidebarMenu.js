'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './SidebarMenu.module.css';

export default function SidebarMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar si el sidebar está abierto

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Obtener el estado de isSidebarOpen del localStorage, si está presente
    const sidebarState = localStorage.getItem('sidebarOpen');
    if (sidebarState) {
      setIsSidebarOpen(JSON.parse(sidebarState));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => {
      const newState = !prevState;
      localStorage.setItem('sidebarOpen', JSON.stringify(newState)); // Guardar el estado en localStorage
      return newState;
    });
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    localStorage.setItem('sidebarOpen', 'false'); // Asegurar que se guarde el estado cerrado
  };

  const handleLinkClick = () => {
    closeSidebar(); // Cerrar el sidebar cuando se haga clic en un enlace
  };

  if (!isAuthenticated) return null; // Si no está autenticado, no mostramos el menú

  return (
    <>
      {/* Botón para mostrar/ocultar el sidebar */}
      <button
        onClick={toggleSidebar}
        className={styles.toggleButton}
      >
        {isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
      </button>

      {/* Mostrar el sidebar solo si el estado isSidebarOpen es verdadero */}
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

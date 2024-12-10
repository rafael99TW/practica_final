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
  }, []);

  if (!isAuthenticated) return null; // Si no está autenticado, no mostramos el menú

  return (
    <>
      {/* Botón para mostrar/ocultar el sidebar */}
      <button 
        onClick={() => setIsSidebarOpen(prevState => !prevState)} 
        className={styles.toggleButton}
      >
        {isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
      </button>

      {/* Mostrar el sidebar solo si el estado isSidebarOpen es verdadero */}
      {isSidebarOpen && (
        <div className={styles.sidebar}>
          <ul>
            <li><Link href="/clientes">Clientes</Link></li>
            <li><Link href="/proyectos/pages/proyectos">Proyectos</Link></li>
          </ul>
        </div>
      )}
    </>
  );
}

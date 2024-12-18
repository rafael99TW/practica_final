'use client';

import Link from 'next/link';
import styles from './page.module.css';
import SidebarMenu from './components/SidebarMenu'; // Importamos el SidebarMenu
import { useState, useEffect } from 'react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Solo se ejecuta en el cliente
      const token = localStorage.getItem('jwt');
      const storedUsername = localStorage.getItem('username'); // Suponiendo que el nombre del usuario está guardado en el localStorage
      if (token) {
        setIsAuthenticated(true);
      }
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleLogout = () => {
    // Limpiar el token y el nombre del usuario del localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <div className={styles.container}>
      {/* Cabecera con los botones */}
      <header className={styles.header}>
        <div className={styles.buttonContainer}>
          {/* Mostrar el nombre del usuario si está autenticado */}
          {isAuthenticated ? (
            <div className={styles.welcomeContainer}>
              <button className={styles.button} onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <>
              {/* Botón para Iniciar sesión */}
              <Link href="/onboarding/login">
                <button className={styles.button}>Iniciar sesión</button>
              </Link>

              {/* Botón para Registrarse */}
              <Link href="/onboarding/register">
                <button className={styles.button}>Registrarse</button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* SidebarMenu solo se muestra si el usuario está autenticado */}
      {isAuthenticated && <SidebarMenu />} {/* Mostramos el menú si el usuario está autenticado */}

      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a la aplicación de gestión de albaranes</h1>
      </main>
    </div>
  );
}

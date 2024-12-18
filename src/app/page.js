'use client';

import Link from 'next/link';
import styles from './page.module.css';
import SidebarMenu from './components/SidebarMenu';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt');
      const storedUsername = localStorage.getItem('username');
      if (token) {
        setIsAuthenticated(true);
      }
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <div className={styles.container}>
      {}
      <header className={styles.header}>
        <div className={styles.buttonContainer}>
          {}
          {isAuthenticated ? (
            <div className={styles.welcomeContainer}>
              <button className={styles.button} onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <>
              {}
              <Link href="/onboarding/login">
                <button className={styles.button}>Iniciar sesión</button>
              </Link>

              {}
              <Link href="/onboarding/register">
                <button className={styles.button}>Registrarse</button>
              </Link>
            </>
          )}
        </div>
      </header>

      {}
      {isAuthenticated && <SidebarMenu />} {}

      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a la aplicación de gestión de albaranes</h1>
      </main>
    </div>
  );
}

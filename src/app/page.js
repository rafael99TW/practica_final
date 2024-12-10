import Link from 'next/link';
import styles from './page.module.css';
import SidebarMenu from './components/SidebarMenu'; // Importamos el SidebarMenu

export default function Home() {
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('jwt');

  return (
    <div className={styles.container}>
      {/* Cabecera con los botones */}
      <header className={styles.header}>
        <div className={styles.buttonContainer}>
          {/* Botón para Iniciar sesión */}
          {!isAuthenticated ? (
            <Link href="/onboarding/login">
              <button className={styles.button}>Iniciar sesión</button>
            </Link>
          ) : (
            <p>¡Estás logueado!</p>
          )}

          {/* Botón para Registrarse */}
          {!isAuthenticated && (
            <Link href="/onboarding/register">
              <button className={styles.button}>Registrarse</button>
            </Link>
          )}
        </div>
      </header>

      {/* SidebarMenu solo se muestra si el usuario está autenticado */}
      <SidebarMenu /> {/* Mostramos el menú si el usuario está autenticado */}

      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a la aplicación de gestión de albaranes</h1>
        <p className={styles.subtitle}>Elige una de las siguientes opciones para empezar:</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
      </footer>
    </div>
  );
}

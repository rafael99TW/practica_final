'use client';

import LoginForm from "./LoginForm"; // Ruta correcta a LoginForm
import styles from './LoginPage.module.css'; // Importar los estilos del page

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Iniciar sesión</h1>
      <LoginForm />
    </div>
  );
}

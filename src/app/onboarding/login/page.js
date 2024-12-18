'use client';

import LoginForm from "./LoginForm";
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Iniciar sesión</h1>
      <LoginForm />
    </div>
  );
}

'use client';

import RegisterForm from "./RegisterForm"; // Ruta correcta a RegisterForm
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.pageContainer}> {/* Aplica el contenedor con estilos */}
      <h1 className={styles.heading}>Registrarse</h1> {/* Aplica el título con estilo */}
      <RegisterForm />
    </div>
  );
}

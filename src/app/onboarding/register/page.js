'use client';

import RegisterForm from "./RegisterForm";
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.pageContainer}> {}
      <h1 className={styles.heading}>Registrarse</h1> {}
      <RegisterForm />
    </div>
  );
}

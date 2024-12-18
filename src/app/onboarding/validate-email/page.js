'use client';

import ValidateEmailForm from "./ValidateEmailForm"; 
import styles from './ValidateEmailPage.module.css';

export default function ValidateEmailPage() {
  return (
    <div className={styles.pageContainer}> {}
      <h1 className={styles.heading}>Validar Correo Electrónico</h1> {}
      <ValidateEmailForm />
    </div>
  );
}

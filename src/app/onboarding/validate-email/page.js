'use client';

import ValidateEmailForm from "./ValidateEmailForm"; // Ruta correcta a ValidateEmailForm
import styles from './ValidateEmailPage.module.css'; // Importa el archivo CSS de la página

export default function ValidateEmailPage() {
  return (
    <div className={styles.pageContainer}> {/* Aplica el contenedor con estilos */}
      <h1 className={styles.heading}>Validar Correo Electrónico</h1> {/* Aplica el título con estilo */}
      <ValidateEmailForm />
    </div>
  );
}

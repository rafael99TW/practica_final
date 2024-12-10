'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importar el router para redirección
import styles from './ValidateEmailForm.module.css'; // Importar los estilos

const ValidateEmailForm = () => {
  const [emailCode, setEmailCode] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Inicializar router para manejar redirección

  const handleValidateEmail = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) {
      setMessage('No se encontró un token. Por favor, regístrese nuevamente.');
      return;
    }

    try {
      await axios.put(
        'https://bildy-rpmaya.koyeb.app/api/user/validation',
        { code: emailCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('Correo validado exitosamente. Redirigiendo a inicio de sesión...');
      
      // Redirigir al usuario a la página de inicio de sesión
      setTimeout(() => {
        router.push('/onboarding/login');
      }, 2000); // Esperar 2 segundos antes de redirigir para mostrar el mensaje
    } catch (error) {
      console.error(error);
      setMessage('Error al validar el correo. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleValidateEmail} className={styles.formContainer}>
      <input
        type="text"
        value={emailCode}
        onChange={(e) => setEmailCode(e.target.value)}
        placeholder="Código de validación"
        required
        className={styles.inputField} 
      />
      <button type="submit" className={styles.submitButton}>
        Validar
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default ValidateEmailForm;

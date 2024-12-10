'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Importar el router correcto para Next.js 13
import styles from './LoginForm.module.css'; // Importar los estilos

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Inicializar router

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bildy-rpmaya.koyeb.app/api/user/login",
        { email, password }
      );

      // Guardar token
      localStorage.setItem("jwt", response.data.token);
      setMessage("Inicio de sesión exitoso!");

      // Redirigir a clientes
      router.push("/clientes"); // Redirigir a la página de clientes
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || 
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.formContainer}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
        className={styles.inputField}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>
        Iniciar sesión
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default LoginForm;

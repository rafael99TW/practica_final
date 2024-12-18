'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bildy-rpmaya.koyeb.app/api/user/login",
        { email, password }
      );

      localStorage.setItem("jwt", response.data.token);
      setMessage("Inicio de sesión exitoso!");

      router.push("/");
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

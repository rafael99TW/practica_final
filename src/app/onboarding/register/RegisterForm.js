'use client';
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'; // Importar useRouter
import styles from './RegisterForm.module.css'; // Importar el CSS

const RegisterForm = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Inicializar router

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://bildy-rpmaya.koyeb.app/api/user/register", {
        email,
        password,
      });
  
      // Guardar token
      localStorage.setItem("jwt", response.data.token);
      setMessage("Registro exitoso! Ahora valida tu correo.");
  
      // Redirigir al formulario de validación de email
      router.push("/onboarding/validate-email");
    } catch (error) {
      setMessage("Error al registrarse. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Registrarse</button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default RegisterForm;

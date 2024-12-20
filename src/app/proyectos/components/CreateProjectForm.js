'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import styles from './CreateProjectForm.module.css';

const CreateProjectForm = ({ onProjectCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    projectCode: "",
    date: "",
    status: "Activo",
    clientId: "",
  });
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("https://bildy-rpmaya.koyeb.app/api/client", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setClients(response.data);
      } catch (error) {
        setMessage("Error al cargar los clientes.");
      }
    };

    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bildy-rpmaya.koyeb.app/api/project",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      onProjectCreated(response.data);
      setMessage("Proyecto creado exitosamente.");
    } catch (error) {
      setMessage("Error al crear el proyecto.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Crear Proyecto</h2>
      {message && <p className={styles.message}>{message}</p>}

      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Nombre del Proyecto"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        className={styles.input}
        type="text"
        name="projectCode"
        placeholder="Código del Proyecto"
        value={formData.projectCode}
        onChange={handleInputChange}
        required
      />
      <input
        className={styles.input}
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        required
      />
      
      {}
      <select
        className={styles.select}
        name="clientId"
        value={formData.clientId}
        onChange={handleInputChange}
        required
      >
        <option value="">Selecciona un Cliente</option>
        {clients.map((client) => (
          <option key={client._id} value={client._id}>
            {client.name}
          </option>
        ))}
      </select>

      <button type="submit" className={styles.submitButton}>
        Crear
      </button>
    </form>
  );
};

export default CreateProjectForm;

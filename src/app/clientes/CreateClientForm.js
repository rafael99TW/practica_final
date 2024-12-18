import { useState } from "react";
import axios from "axios";
import styles from './CreateClientForm.module.css';

const CreateClientForm = ({ onClientAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bildy-rpmaya.koyeb.app/api/client",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      onClientAdded(response.data); // Notificar al componente padre
      setMessage("Cliente creado exitosamente.");
    } catch (error) {
      setMessage("Error al crear el cliente.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Crear Cliente</h2>
      {message && <p className={styles.message}>{message}</p>}

      <input
        type="text"
        name="name"
        placeholder="Nombre del Cliente"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="address.street"
        placeholder="Calle"
        value={formData.address.street}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="address.number"
        placeholder="Número"
        value={formData.address.number}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="address.postal"
        placeholder="Código Postal"
        value={formData.address.postal}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="address.city"
        placeholder="Ciudad"
        value={formData.address.city}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="address.province"
        placeholder="Provincia"
        value={formData.address.province}
        onChange={handleInputChange}
        required
      />

      <button type="submit" className={styles.submitButton}>
        Crear
      </button>
    </form>
  );
};

export default CreateClientForm;

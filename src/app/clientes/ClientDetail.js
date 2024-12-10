import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from './ClientDetail.module.css'; // Asegúrate de agregar el archivo CSS

const ClientDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const fetchClientDetails = async () => {
        try {
          const response = await axios.get(
            `https://bildy-rpmaya.koyeb.app/api/client/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
          setClient(response.data);
        } catch (error) {
          setMessage("Error al cargar el cliente.");
        }
      };

      fetchClientDetails();
    }
  }, [id]);

  if (!client) return <p className={styles.loading}>Cargando...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Detalles del Cliente</h1>
      {message && <p className={styles.errorMessage}>{message}</p>}
      <div className={styles.details}>
        <p><strong>ID:</strong> {client.id}</p>
        <p><strong>Nombre:</strong> {client.name}</p>
        {/* Mostrar más detalles según la estructura de la respuesta */}
      </div>
    </div>
  );
};

export default ClientDetail;

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ClientDetail = () => {
  const router = useRouter();
  const { id } = router.query;  // Obtén el ID del cliente desde la URL
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
          setClient(response.data);  // Asumiendo que la respuesta es un objeto con los detalles del cliente
        } catch (error) {
          setMessage("Error al cargar el cliente.");
        }
      };

      fetchClientDetails();
    }
  }, [id]);

  if (!client) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Detalles del Cliente</h1>
      {message && <p>{message}</p>}
      <p><strong>ID:</strong> {client.id}</p>
      <p><strong>Nombre:</strong> {client.name}</p>
      {/* Mostrar más detalles según la estructura de la respuesta */}
    </div>
  );
};

export default ClientDetail;

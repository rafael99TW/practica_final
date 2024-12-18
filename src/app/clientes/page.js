'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import styles from './ClientsPage.module.css';
import CreateClientForm from './CreateClientForm';
import SidebarMenu from "../components/SidebarMenu";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "https://bildy-rpmaya.koyeb.app/api/client",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        setClients(response.data);
      } catch (error) {
        setMessage("Error al cargar los clientes.");
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este cliente?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://bildy-rpmaya.koyeb.app/api/client/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setClients((prev) => prev.filter((client) => client._id !== id));
      setMessage("Cliente eliminado correctamente.");
    } catch (error) {
      setMessage("Error al eliminar el cliente.");
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const closeModal = () => {
    setSelectedClient(null);
  };

  return (
    <div className={styles.container}>
      <SidebarMenu /> {}
      
      <h1 className={styles.header}>Clientes</h1>

      {message && <p className={styles.message}>{message}</p>}

      {showForm ? (
        <CreateClientForm onClientAdded={(newClient) => {
          setClients((prev) => [...prev, newClient]);
          toggleForm();
        }} />
      ) : (
        <>
          {clients.length === 0 ? (
            <div className={styles.noClients}>
              <p>No existe ningún cliente</p>
              <button onClick={toggleForm} className={styles.addButton}>Crear Cliente</button>
            </div>
          ) : (
            <>
              <button onClick={toggleForm} className={styles.addButton}>+</button>
              <ul className={styles.clientList}>
                {clients.map((client) => (
                  <li key={client._id} className={styles.clientItem}>
                    <span onClick={() => handleClientClick(client)}>{client.name}</span>
                    <button onClick={() => handleDelete(client._id)} className={styles.deleteButton}>X</button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      {selectedClient && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>X</span>
            <h2>{selectedClient.name}</h2>
            <p><strong>CIF:</strong> {selectedClient.cif}</p>
            <p><strong>Dirección:</strong> {selectedClient.address.street}</p>
            <p><strong>Proyectos Activos:</strong> {selectedClient.activeProjects}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;

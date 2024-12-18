'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import styles from './ProjectsPage.module.css';
import CreateProjectForm from '../../components/CreateProjectForm';
import SidebarMenu from "@/app/components/SidebarMenu";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [clients, setClients] = useState({});

  // Cargar proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://bildy-rpmaya.koyeb.app/api/project",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        setMessage("Error al cargar los proyectos.");
      }
    };

    fetchProjects();
  }, []);

  // Cargar clientes
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
        const clientsMap = response.data.reduce((acc, client) => {
          acc[client._id] = client.name;
          return acc;
        }, {});
        setClients(clientsMap);
      } catch (error) {
        setMessage("Error al cargar los clientes.");
      }
    };

    fetchClients();
  }, []);

  const toggleForm = () => setShowForm(!showForm);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este proyecto?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://bildy-rpmaya.koyeb.app/api/project/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setProjects((prev) => prev.filter((project) => project._id !== id));
      setMessage("Proyecto eliminado correctamente.");
    } catch (error) {
      setMessage("Error al eliminar el proyecto.");
    }
  };

  return (
    <div className={styles.container}>
      <SidebarMenu /> {}
      
      <h1 className={styles.header}>Proyectos</h1>

      {message && <p className={styles.message}>{message}</p>}

      {showForm ? (
        <CreateProjectForm onProjectCreated={(newProject) => {
          setProjects((prev) => [...prev, newProject]);
          toggleForm();
        }} />
      ) : (
        <>
          {projects.length === 0 ? (
            <div className={styles.noProjects}>
              <p>No existe ningún proyecto</p>
              <button onClick={toggleForm} className={styles.addButton}>
                Crear Proyecto
              </button>
            </div>
          ) : (
            <>
              <button onClick={toggleForm} className={styles.addButton}>
                +
              </button>
              <ul className={styles.projectList}>
                {projects.map((project) => (
                  <li 
                    key={project._id} 
                    className={styles.projectItem} 
                    onClick={() => handleProjectClick(project)}
                  >
                    <span>{project.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleDelete(project._id);
                      }}
                      className={styles.deleteButton}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      {selectedProject && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selectedProject.name}</h2>
            <p><strong>Código:</strong> {selectedProject.projectCode}</p>
            <p><strong>Fecha:</strong> {selectedProject.date}</p>
            <p><strong>Estado:</strong> {selectedProject.status}</p>
            <p><strong>Cliente:</strong> {clients[selectedProject.clientId] || "Cliente no encontrado"}</p> {}
            <button onClick={closeModal} className={styles.close}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;

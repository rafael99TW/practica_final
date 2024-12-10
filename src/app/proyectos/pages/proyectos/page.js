'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import styles from './ProjectsPage.module.css'; // Archivo CSS para estilos
import CreateProjectForm from '../../components/CreateProjectForm';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

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

  // Mostrar el formulario de creación
  const toggleForm = () => setShowForm(!showForm);

  // Manejar eliminación de proyecto
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
                  <li key={project._id} className={styles.projectItem}>
                    <span>{project.name}</span>
                    <button
                      onClick={() => handleDelete(project._id)}
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
    </div>
  );
};

export default ProjectsPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './projects.css'; // External CSS

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/projects/');
                setProjects(response.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to load projects. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="projects-container">
          <div>
          <Link to="/todo" className="todo-link">
                To do list
            </Link>
          </div>
            {projects.map((project) => (
                <div key={project.name} className="project-card">

                    <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit GitHub page for ${project.name}`}
                    >
                        <p>{project.name}</p>
                    </a>
                    <img
                        src={project.image || 'placeholder-image.jpg'}
                        alt={project.name}
                        className="project-image"
                    />
                    <p>{project.description || 'No description available.'}</p>
                </div>
            ))}
        </div>
    );
};

export default Projects;

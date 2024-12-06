import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../axiosinstance'; 
import { Link } from 'react-router-dom';
import './projects.css'; // Page-specific styles (loaded last)
import todoListGif from '../images/todo_list_demo.gif';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await AxiosInstance.get('/projects/');
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
        <div className='projects-page'>
            <h1 className='project-header'>Projects</h1>
        <div className="projects-container">
            {/* To Do List Block */}
            <div className="project-block">
                <div className="project-image-container">
                    <img
                        src={todoListGif} // Replace with your To-Do list image URL
                        alt="To Do List"
                        className="project-image"
                    />
                </div>
                <Link
                    to="/todo"
                    className="project-title"
                    aria-label="Navigate to To Do List application"
                >
                    <p>To Do List</p>
                </Link>
                <p className="project-description">
                    Interactive to do list application. This was the first component that I developed for this website. It was a large learning curve and required learning
                    and using Django, PostGreSQL, React, and axios API.
                </p>
            </div>

            {/* Dynamically loaded projects */}
            {projects.map((project, index) => (
                <div key={project.name} className="project-block" data-priority={index + 2}>
                    <div className="project-image-container">
                        <img
                            src={project.image}
                            alt={project.name}
                            className="project-image"
                        />
                    </div>
                    <a
                        href={project.github_url}
                        className="project-title"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit GitHub page for ${project.name}`}
                    >
                        <p>{project.name}</p>
                    </a>
                    <p className="project-description">{project.description}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default Projects;
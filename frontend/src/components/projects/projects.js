import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/projects/');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <h1>Projects</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {projects.map((project) => (
                    <div key={project.id} style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <img src={project.thumbnail} alt={project.name} style={{ width: '150px', height: '150px' }} />
                            <p>{project.name}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {projects.map((project) => (
            <div key={project.name} style={{ cursor: 'pointer', textAlign: 'center' }}>
              {/* Only the project name is wrapped in an anchor tag */}
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <p>{project.name}</p> {/* This will now be a clickable link */}
              </a>
              {/* The image and description are not clickable */}
              <img
                src={project.image}
                alt={project.name}
                style={{ width: '300px', height: '150px' }}
              />
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      );
    };
    
    export default Projects;
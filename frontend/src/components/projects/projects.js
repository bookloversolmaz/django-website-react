import React from 'react';
import './projects.css';

const projectData = [
  {
    title: 'C# Controller-Based API',
    description:
      'Backend API built with C# and .NET, focused on clean controller structure, maintainable endpoints, and production-style architecture.',
    tech: ['C#', '.NET', 'REST API', 'SQL'],
    github: 'https://github.com/bookloversolmaz/Controller_based_API',
    demo: '',
  },
  {
    title: 'Foodshare',
    description:
      'Full-stack app designed to support food redistribution, with an emphasis on practical UX, clear data flow, and meaningful real-world impact.',
    tech: ['React', 'Django', 'PostgreSQL', 'JavaScript'],
    github: 'https://github.com/maddc0de/foodshare',
    demo: 'https://github.com/maddc0de/foodshare/raw/main/diagrams/how_to_use.gif',
  },
  {
    title: 'Words to Images',
    description:
      'Creative app that turns text input into generated imagery, combining backend request handling, API integration, and a simple interface.',
    tech: ['Python', 'Flask', 'API Integration', 'HTML/CSS'],
    github: 'https://github.com/bookloversolmaz/words_to_images_CS50_project?tab=readme-ov-file',
    demo: 'https://raw.githubusercontent.com/bookloversolmaz/words_to_images_CS50_project/main/static/demo_gif.gif',
  },
];

function Projects() {
  return (
    <main className="projects-page page-shell">
      <section className="projects-hero page-hero">
        <h1 className="projects-heading page-heading">Projects</h1>
        <p className="projects-intro page-intro">
          A small selection of projects that reflect my interests in backend engineering, full-stack development and thoughtful user-focused software.
        </p>
      </section>

      <section className="projects-grid-section">
        <div className="projects-grid">
          {projectData.map((project) => (
            <article className="project-card glass-card" key={project.title}>
              <div className="project-card-top">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>

              <div className="tech-tag-list">
                {project.tech.map((item) => (
                  <span className="tech-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link primary-link"
                  >
                    View Code
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link secondary-link"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Projects;




// import React, { useEffect, useState } from 'react';
// import AxiosInstance from '../../axiosinstance'; 
// import { Link } from 'react-router-dom';
// import './projects.css'; // Page-specific styles (loaded last)
// import todoListGif from '../images/todo_list_demo.gif';

// const Projects = () => {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await AxiosInstance.get('/projects/');   
//                 setProjects(response.data);
//             } catch (err) {
//                 console.error('Error fetching projects:', err);
//                 setError('Failed to load projects. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className='projects-page'>
//             <h1 className='project-header'>Projects</h1>
//         <div className="projects-container">
//             {/* To Do List Block */}
//             <div className="project-block">
//                 <div className="project-image-container">
//                     <img
//                         src={todoListGif} // Replace with your To-Do list image URL
//                         alt="To Do List"
//                         className="project-image"
//                     />
//                 </div>
//                 <Link
//                     to="/todo"
//                     className="project-title"
//                     aria-label="Navigate to To Do List application"
//                 >
//                     <p>To Do List</p>
//                 </Link>
//                 <p className="project-description">
//                     Interactive to do list application. This was the first component that I developed for this website. It was a large learning curve and required learning
//                     and using Django, PostGreSQL, React, and axios API.
//                 </p>
//             </div>

//             {/* Dynamically loaded projects */}
//             {projects.map((project, index) => (
//                 <div key={project.name} className="project-block" data-priority={index + 2}>
//                     <div className="project-image-container">
//                         <img
//                             src={project.image}
//                             alt={project.name}
//                             className="project-image"
//                         />
//                     </div>
//                     <a
//                         href={project.github_url}
//                         className="project-title"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label={`Visit GitHub page for ${project.name}`}
//                     >
//                         <p>{project.name}</p>
//                     </a>
//                     <p className="project-description">{project.description}</p>
//                 </div>
//             ))}
//         </div>
//     </div>
//     );
// };

// export default Projects;
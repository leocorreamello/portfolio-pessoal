import ProjectCard from './ProjectCard';
import PropTypes from 'prop-types';

export default function Card({ isEnglish, content }) {
    const { projects, technologies } = content;

    const techById = technologies.reduce((accumulator, tech) => {
        accumulator[tech.id] = tech;
        return accumulator;
    }, {});

    return (
        <section aria-labelledby='projects-title' className="w-full">
            <div className='flex flex-col items-center text-center w-full'>
                <h1 id='projects-title' className='text-[clamp(2rem,5vw,4.6rem)] leading-tight text-textMain'>
                    {isEnglish ? 'Projects' : 'Projetos'}
                </h1>
                <p className='text-textMuted mt-3 max-w-2xl text-sm sm:text-base lg:text-lg'>
                    {isEnglish
                        ? 'A selection of relevant projects I built throughout my career, showcasing different challenges, technologies and real-world solutions.'
                        : 'Uma seleção de projetos relevantes que desenvolvi ao longo da minha carreira, mostrando diferentes desafios, tecnologias e soluções reais.'}
                </p>
                <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 2xl:gap-10 mt-8 lg:mt-10 w-full items-stretch'>
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            techById={techById}
                            isEnglish={isEnglish}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

Card.propTypes = {
    isEnglish: PropTypes.bool.isRequired,
    content: PropTypes.shape({
        projects: PropTypes.array.isRequired,
        technologies: PropTypes.array.isRequired,
    }).isRequired,
};
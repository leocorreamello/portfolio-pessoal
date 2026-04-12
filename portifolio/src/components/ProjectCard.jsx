import { TbWorldWww } from 'react-icons/tb';
import { FaCode } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function ProjectCard({ project, techById, isEnglish }) {
  const codeLabel = isEnglish ? 'Code' : 'Codigo';
  const liveLabel = isEnglish ? 'Live' : 'Site';
  const isExternalLive = project.liveUrl.startsWith('http');

  return (
    <article className='flex flex-col items-center bg-background p-4 sm:p-5 lg:p-6 2xl:p-7 rounded-xl shadow-lg h-full'>
      <h2 className='text-center text-[clamp(1.4rem,3vw,2rem)] leading-tight'>{project.title}</h2>
      <img
        src={project.image}
        alt={project.title}
        className='w-full max-w-[24rem] aspect-[4/3] object-cover rounded-3xl border-gradient'
        loading='lazy'
        decoding='async'
      />

      <div className='flex justify-center gap-3 sm:gap-4 mt-4 flex-wrap'>
        {project.techIds.map((techId) => {
          const tech = techById[techId];
          if (!tech) return null;

          return (
            <img
              key={`${project.id}-${tech.id}`}
              src={tech.icon}
              alt={tech.name}
              className='w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10'
              loading='lazy'
              decoding='async'
            />
          );
        })}
      </div>

      <div className='flex flex-wrap justify-center gap-3 mt-4 w-full'>
        <a
          href={project.codeUrl}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${project.title} repository`}
          className='flex justify-center bg-slate-800 px-3 py-2 sm:px-4 sm:py-2 items-center gap-1 rounded-xl hover:bg-slate-600 hover:animate-button-hover min-w-[120px]'
        >
          <FaCode className='size-5 lg:size-6' />
          <span className='text-sm sm:text-base lg:text-lg'>{codeLabel}</span>
        </a>

        <a
          href={project.liveUrl}
          target={isExternalLive ? '_blank' : '_self'}
          rel={isExternalLive ? 'noopener noreferrer' : undefined}
          aria-label={`${project.title} live project`}
          className='flex justify-center bg-slate-800 px-3 py-2 sm:px-4 sm:py-2 items-center gap-1 rounded-xl hover:bg-slate-600 hover:animate-button-hover min-w-[120px]'
        >
          <TbWorldWww className='size-5 lg:size-6' />
          <span className='text-sm sm:text-base lg:text-lg'>{liveLabel}</span>
        </a>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    techIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    codeUrl: PropTypes.string.isRequired,
    liveUrl: PropTypes.string.isRequired,
  }).isRequired,
  techById: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  isEnglish: PropTypes.bool.isRequired,
};

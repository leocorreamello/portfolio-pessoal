import { Code2, Globe } from 'lucide-react';
import PropTypes from 'prop-types';
import { getTechnologyIcon } from '../lib/technologyIcons';

export default function ProjectCard({ project, techById, isEnglish }) {
  const codeLabel = isEnglish ? 'Code' : 'Código';
  const liveLabel = isEnglish ? 'Live' : 'Site';
  const isExternalLive = project.liveUrl.startsWith('http');

  return (
    <article className='reveal-up interactive-lift flex flex-col items-center glass-panel p-4 sm:p-5 lg:p-6 2xl:p-7 rounded-2xl shadow-card h-full'>
      <h2 className='text-center text-[clamp(1.3rem,3vw,1.9rem)] leading-tight text-textMain min-h-[3.2rem] flex items-center'>{project.title}</h2>
      <img
        src={project.image}
        alt={project.title}
        className='w-full max-w-full aspect-[4/3] object-cover rounded-2xl border-gradient mt-3'
        loading='lazy'
        decoding='async'
      />

      <div className='flex justify-center gap-3 sm:gap-4 mt-4 flex-wrap'>
        {project.techIds.map((techId) => {
          const tech = techById[techId];
          if (!tech) return null;

          const mappedTech = getTechnologyIcon(tech.id);

          return (
            <span key={`${project.id}-${tech.id}`} className='inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-borderSoft bg-surfaceSoft'>
              {mappedTech ? (
                <mappedTech.Icon
                  aria-hidden='true'
                  className='w-4 h-4 sm:w-5 sm:h-5'
                  style={{ color: mappedTech.color }}
                />
              ) : (
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className='w-4 h-4 sm:w-5 sm:h-5'
                  loading='lazy'
                  decoding='async'
                />
              )}
            </span>
          );
        })}
      </div>

      <div className='flex flex-wrap justify-center gap-3 mt-5 w-full'>
        <a
          href={project.codeUrl}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${project.title} repository`}
          className='interactive-lift flex w-full sm:w-auto justify-center border border-borderSoft bg-surfaceSoft px-3 py-2 sm:px-4 sm:py-2 items-center gap-2 rounded-xl hover:border-accentStart/45 hover:bg-surfaceMuted sm:min-w-[132px]'
        >
          <Code2 className='size-4 sm:size-5' />
          <span className='text-sm sm:text-base lg:text-lg'>{codeLabel}</span>
        </a>

        <a
          href={project.liveUrl}
          target={isExternalLive ? '_blank' : '_self'}
          rel={isExternalLive ? 'noopener noreferrer' : undefined}
          aria-label={`${project.title} live project`}
          className='interactive-lift flex w-full sm:w-auto justify-center border border-borderSoft bg-surfaceSoft px-3 py-2 sm:px-4 sm:py-2 items-center gap-2 rounded-xl hover:border-accentStart/45 hover:bg-surfaceMuted sm:min-w-[132px]'
        >
          <Globe className='size-4 sm:size-5' />
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

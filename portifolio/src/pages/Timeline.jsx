import PropTypes from 'prop-types';

const getText = (value, isEnglish) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return isEnglish ? value.en || '' : value.pt || '';
};

export default function Timeline({ content, isEnglish }) {
  const items = content.timeline || [];

  return (
    <section className='px-4 sm:px-6 md:px-10 py-16 sm:py-20 bg-background text-textMain'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='space-y-3 max-w-3xl'>
          <p className='text-sm uppercase tracking-[0.3em] text-textMuted'>
            {isEnglish ? 'Career timeline' : 'Trajetória profissional'}
          </p>
          <h2 className='text-3xl sm:text-4xl font-semibold'>
            {isEnglish ? 'Timeline' : 'Linha do tempo'}
          </h2>
          <p className='text-textMuted text-lg'>
            {isEnglish
              ? 'A concise path through studies, jobs, and milestones.'
              : 'Um resumo direto dos estudos, experiências e marcos da minha jornada.'}
          </p>
        </div>

        {items.length > 0 ? (
          <div className='relative pl-6 sm:pl-10 border-l border-white/10 space-y-6'>
            {items.map((item) => (
              <article key={item.id} className='relative rounded-3xl bg-surface/80 border border-surfaceMuted p-5 sm:p-6 shadow-card glass-panel'>
                <span className='absolute -left-[1.62rem] sm:-left-[2.1rem] top-6 w-4 h-4 rounded-full bg-gradient-to-r from-accentStart to-accentEnd ring-8 ring-background' />
                <div className='flex flex-wrap items-center gap-3 text-sm text-textMuted mb-3'>
                  <span className='px-3 py-1 rounded-full bg-surfaceMuted text-textMain'>{item.period}</span>
                  <span className='px-3 py-1 rounded-full border border-surfaceMuted'>{item.type}</span>
                  {item.location ? <span>{item.location}</span> : null}
                </div>
                <h3 className='text-xl sm:text-2xl font-semibold'>{item.title}</h3>
                <p className='text-accentStart font-medium mt-1'>{item.organization}</p>
                <p className='text-textMuted mt-3 leading-7'>{getText(item.description, isEnglish)}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className='rounded-3xl border border-dashed border-white/15 bg-surface/50 p-6 text-textMuted'>
            {isEnglish
              ? 'Timeline content is not available yet.'
              : 'O conteúdo da linha do tempo ainda não foi adicionado.'}
          </div>
        )}
      </div>
    </section>
  );
}

Timeline.propTypes = {
  content: PropTypes.shape({
    timeline: PropTypes.array,
  }).isRequired,
  isEnglish: PropTypes.bool.isRequired,
};

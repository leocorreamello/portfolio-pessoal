import PropTypes from 'prop-types';

const getText = (value, isEnglish) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return isEnglish ? value.en || '' : value.pt || '';
};

export default function SocialImpact({ content, isEnglish }) {
  const items = content.socialImpact || [];

  return (
    <section id='social-impact' className='px-4 sm:px-6 md:px-10 py-16 sm:py-20 bg-background text-textMain'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='space-y-3 max-w-3xl'>
          <p className='text-sm uppercase tracking-[0.3em] text-textMuted'>
            {isEnglish ? 'Community initiatives' : 'Iniciativas sociais'}
          </p>
          <h2 className='text-3xl sm:text-4xl font-semibold'>
            {isEnglish ? 'Social impact' : 'Ações sociais'}
          </h2>
          <p className='text-textMuted text-lg'>
            {isEnglish
              ? 'Initiatives, volunteering, and projects that made a positive difference.'
              : 'Iniciativas, voluntariado e projetos que geraram impacto positivo.'}
          </p>
        </div>

        {items.length > 0 ? (
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch'>
            {items.map((item) => (
              <article key={item.id} className='overflow-hidden rounded-3xl bg-surface/80 border border-surfaceMuted shadow-card glass-panel h-full min-w-0'>
                <div className='aspect-[4/3] sm:aspect-[16/10] bg-[#0f1420] overflow-hidden'>
                  <img src={item.image} alt={item.title} className='w-full h-full object-cover' loading='lazy' />
                </div>
                <div className='p-5 space-y-4'>
                  <div className='flex items-center justify-between gap-3 text-sm text-textMuted'>
                    <span className='px-3 py-1 rounded-full bg-surfaceMuted text-textMain'>{item.period}</span>
                    {item.impact ? <span className='text-right'>{item.impact}</span> : null}
                  </div>
                  <h3 className='text-xl font-semibold'>{item.title}</h3>
                  <p className='text-textMuted leading-7'>{getText(item.description, isEnglish)}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className='rounded-3xl border border-dashed border-white/15 bg-surface/50 p-6 text-textMuted'>
            {isEnglish
              ? 'Community actions will appear here after they are added in the admin.'
              : 'As ações sociais aparecerão aqui depois que forem adicionadas no admin.'}
          </div>
        )}
      </div>
    </section>
  );
}

SocialImpact.propTypes = {
  content: PropTypes.shape({
    socialImpact: PropTypes.array,
  }).isRequired,
  isEnglish: PropTypes.bool.isRequired,
};

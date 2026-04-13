import PropTypes from 'prop-types';

const getText = (value, isEnglish) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return isEnglish ? value.en || '' : value.pt || '';
};

export default function Certificates({ content, isEnglish }) {
  const items = content.certificates || [];

  return (
    <section id='certificates' className='px-4 sm:px-6 md:px-10 py-16 sm:py-20 bg-background text-textMain'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='space-y-3 max-w-3xl'>
          <p className='text-sm uppercase tracking-[0.3em] text-textMuted'>
            {isEnglish ? 'Education & certifications' : 'Formação e certificações'}
          </p>
          <h2 className='text-3xl sm:text-4xl font-semibold'>
            {isEnglish ? 'Certificates' : 'Certificados'}
          </h2>
          <p className='text-textMuted text-lg'>
            {isEnglish
              ? 'Selected courses and certifications that support my current stack.'
              : 'Cursos e certificações que fortalecem meu repertório técnico.'}
          </p>
        </div>

        {items.length > 0 ? (
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch'>
            {items.map((item) => (
              <article key={item.id} className='overflow-hidden rounded-3xl bg-surface/80 border border-surfaceMuted shadow-card glass-panel h-full min-w-0'>
                <div className='aspect-[16/10] sm:aspect-[16/9] bg-[#0f1420] overflow-hidden'>
                  <img src={item.image} alt={item.title} className='w-full h-full object-cover' loading='lazy' />
                </div>
                <div className='p-5 space-y-4'>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <h3 className='text-xl font-semibold'>{item.title}</h3>
                      <p className='text-accentStart'>{item.issuer}</p>
                    </div>
                    <span className='text-sm text-textMuted whitespace-normal text-right'>{item.date}</span>
                  </div>
                  <p className='text-textMuted leading-7'>{getText(item.description, isEnglish)}</p>
                  <div className='flex flex-wrap items-center gap-3'>
                    {item.credentialUrl ? (
                      <a
                        href={item.credentialUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex items-center justify-center rounded-full px-4 py-2 bg-gradient-to-r from-accentStart to-accentEnd text-black font-medium'
                      >
                        {isEnglish ? 'Open credential' : 'Abrir credencial'}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className='rounded-3xl border border-dashed border-white/15 bg-surface/50 p-6 text-textMuted'>
            {isEnglish
              ? 'Certificates will appear here after the first upload.'
              : 'Os certificados aparecerão aqui após o primeiro upload.'}
          </div>
        )}
      </div>
    </section>
  );
}

Certificates.propTypes = {
  content: PropTypes.shape({
    certificates: PropTypes.array,
  }).isRequired,
  isEnglish: PropTypes.bool.isRequired,
};

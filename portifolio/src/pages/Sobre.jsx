import { useState } from 'react';
import { FileText } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { SiGithub } from 'react-icons/si';
import { getTechnologyIcon } from '../lib/technologyIcons';

const Sobre = ({ isEnglish, content }) => {
    const [hoveredImg, setHoveredImg] = useState(null);
    const { profile, resume, socialLinks, technologies } = content;

    const handleMouseEnter = (alt) => {
        setHoveredImg(alt);
    };

    const handleMouseLeave = () => {
        setHoveredImg(null);
    };

    return (
        <section aria-labelledby='about-title' className='section-fade min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 3xl:px-24 py-12 lg:py-20'>
            <div className="w-full max-w-10xl mx-auto flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 2xl:gap-12">
                <img
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    className='reveal-up w-36 xs:w-40 sm:w-48 md:w-56 lg:w-72 xl:w-80 2xl:w-96 3xl:w-[30rem] rounded-full border border-accentStart/35 shadow-glow shrink-0 xl:sticky xl:top-36'
                    loading='lazy'
                    decoding='async'
                />

                <div className="reveal-up reveal-delay-1 glass-panel rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 w-full max-w-5xl">
                    <div className='text-center xl:text-left'>
                        <span className='inline-flex px-3 py-1 text-xs sm:text-sm rounded-full border border-borderSoft bg-surfaceSoft text-textMuted mb-4'>
                            {isEnglish ? 'About & Toolkit' : 'Sobre & Toolkit'}
                        </span>
                        <h1 id='about-title' className="text-[clamp(1.8rem,4.8vw,4.2rem)] leading-tight">{profile.name}</h1>
                        <p className="text-sm xs:text-base sm:text-lg lg:text-xl 2xl:text-2xl text-justify mt-4 leading-relaxed text-textMuted">
                            {isEnglish ? profile.about.en : profile.about.pt}
                        </p>

                        <h2 className="text-[clamp(1.3rem,3.5vw,2.3rem)] mt-8">
                            {isEnglish ? "Tech Stack" : "Tech Stack"}
                        </h2>
                        <div className='flex flex-wrap justify-center xl:justify-start mt-4 gap-3 sm:gap-4'>
                            {technologies.map((image) => (
                                <button
                                    key={image.id}
                                    type="button"
                                    className="interactive-lift relative group rounded-xl p-1.5 sm:p-2 border border-borderSoft bg-surfaceSoft/80 hover:border-accentStart/40"
                                    onMouseEnter={() => handleMouseEnter(image.name)}
                                    onMouseLeave={handleMouseLeave}
                                    onFocus={() => handleMouseEnter(image.name)}
                                    onBlur={handleMouseLeave}
                                    aria-label={image.name}
                                >
                                    {(() => {
                                        const mappedTech = getTechnologyIcon(image.id);

                                        if (mappedTech) {
                                            const TechIcon = mappedTech.Icon;
                                            return (
                                                <TechIcon
                                                    aria-hidden='true'
                                                    className='w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11'
                                                    style={{ color: mappedTech.color }}
                                                />
                                            );
                                        }

                                        return <img src={image.icon} alt={image.name} className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11" />;
                                    })()}
                                    {hoveredImg === image.name && (
                                        <div className="popup group-focus:opacity-100">
                                            {image.name}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <h2 className="text-[clamp(1.3rem,3.5vw,2.3rem)] mt-8">
                            {isEnglish ? "Contact" : "Contato"}
                        </h2>
                        <div className='flex flex-wrap justify-center xl:justify-start mt-4 gap-3 sm:gap-4'>
                            <a href={socialLinks.github} target='_blank' rel="noopener noreferrer" aria-label="GitHub profile" className="interactive-lift inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-borderSoft bg-surfaceSoft text-textMain hover:border-accentStart/50 hover:text-accentStart">
                                <SiGithub className='w-5 h-5 sm:w-6 sm:h-6' />
                            </a>
                            <a href={socialLinks.linkedin} target='_blank' rel="noopener noreferrer" aria-label="LinkedIn profile" className="interactive-lift inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-borderSoft bg-surfaceSoft text-textMain hover:border-accentStart/50 hover:text-accentStart">
                                <FaLinkedin className='w-5 h-5 sm:w-6 sm:h-6' />
                            </a>
                            <a href={resume.file} target='_blank' rel="noopener noreferrer" aria-label={isEnglish ? 'Download resume' : 'Baixar currículo'} className="interactive-lift inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-borderSoft bg-surfaceSoft text-textMain hover:border-accentStart/50 hover:text-accentStart">
                                <FileText className='w-5 h-5 sm:w-6 sm:h-6' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sobre;

Sobre.propTypes = {
    isEnglish: PropTypes.bool.isRequired,
    content: PropTypes.shape({
        profile: PropTypes.object.isRequired,
        resume: PropTypes.object.isRequired,
        socialLinks: PropTypes.object.isRequired,
        technologies: PropTypes.array.isRequired,
    }).isRequired,
};
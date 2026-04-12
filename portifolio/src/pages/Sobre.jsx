import { useState } from 'react';
import PropTypes from 'prop-types';

const Sobre = ({ isEnglish, content }) => {
    const [hoveredImg, setHoveredImg] = useState(null);
    const { contactIcons, profile, resume, socialLinks, technologies } = content;

    const handleMouseEnter = (alt) => {
        setHoveredImg(alt);
    };

    const handleMouseLeave = () => {
        setHoveredImg(null);
    };

    return (
        <section aria-labelledby='about-title' className='min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 3xl:px-24 py-12 lg:py-20'>
            <div className="w-full max-w-10xl mx-auto flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 2xl:gap-12">
                <img
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    className='w-44 xs:w-52 sm:w-60 md:w-72 lg:w-80 2xl:w-96 3xl:w-[30rem] rounded-full outline outline-2 outline-white shrink-0'
                    loading='lazy'
                    decoding='async'
                />

                <div className="bg-surface rounded-3xl border-4 border-gradient p-5 sm:p-6 md:p-8 lg:p-10 w-full max-w-5xl">
                    <div className='text-center xl:text-left'>
                        <h1 id='about-title' className="text-[clamp(1.8rem,4.8vw,4.2rem)] leading-tight">{profile.name}</h1>
                        <p className="text-sm xs:text-base sm:text-lg lg:text-xl 2xl:text-2xl text-justify mt-4 leading-relaxed">
                            {isEnglish ? profile.about.en : profile.about.pt}
                        </p>

                        <h2 className="text-[clamp(1.3rem,3.5vw,2.3rem)] mt-8">
                            {isEnglish ? "Technologies" : "Tecnologias"}
                        </h2>
                        <div className='flex flex-wrap justify-center xl:justify-start mt-4 gap-3 sm:gap-4'>
                            {technologies.map((image) => (
                                <button
                                    key={image.id}
                                    type="button"
                                    className="relative group rounded-lg"
                                    onMouseEnter={() => handleMouseEnter(image.name)}
                                    onMouseLeave={handleMouseLeave}
                                    onFocus={() => handleMouseEnter(image.name)}
                                    onBlur={handleMouseLeave}
                                    aria-label={image.name}
                                >
                                    <img src={image.icon} alt={image.name} className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                                    {hoveredImg === image.name && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-white text-xs md:text-sm p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
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
                            <a href={socialLinks.github} target='_blank' rel="noopener noreferrer" aria-label="GitHub profile" className="p-1 rounded-lg">
                                <img src={contactIcons.github} alt="GitHub" className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 hover:animate-button-hover" />
                            </a>
                            <a href={socialLinks.linkedin} target='_blank' rel="noopener noreferrer" aria-label="LinkedIn profile" className="p-1 rounded-lg">
                                <img src={contactIcons.linkedin} alt="LinkedIn" className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 hover:animate-button-hover" />
                            </a>
                            <a href={resume.file} target='_blank' rel="noopener noreferrer" aria-label={isEnglish ? 'Download resume' : 'Baixar curriculo'} className="p-1 rounded-lg">
                                <img src={contactIcons.resume} alt="Curriculo" className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 hover:animate-button-hover" />
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
        contactIcons: PropTypes.object.isRequired,
        profile: PropTypes.object.isRequired,
        resume: PropTypes.object.isRequired,
        socialLinks: PropTypes.object.isRequired,
        technologies: PropTypes.array.isRequired,
    }).isRequired,
};
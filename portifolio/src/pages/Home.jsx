import { Download } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';
import PropTypes from 'prop-types';

export default function Home({ isEnglish, content }) {
    const { profile, resume, socialLinks } = content;

    return (
        <section aria-labelledby='home-title' className="section-fade relative min-h-screen flex items-center px-4 sm:px-6 md:px-10 lg:px-16 3xl:px-24 pt-24 sm:pt-28 lg:pt-32 pb-10">
                <div className='w-full max-w-10xl mx-auto'>
                    <div className="max-w-5xl relative z-[1]">
                        <h1 id='home-title' className="reveal-up reveal-delay-1 text-[clamp(1.35rem,3.8vw,2.8rem)] leading-tight text-textMuted">
                            {isEnglish ? profile.greeting.en : profile.greeting.pt}
                        </h1>
                        <h1 className="reveal-up reveal-delay-2 text-[clamp(2.1rem,9vw,7rem)] tracking-[-0.03em] leading-[1] font-extrabold text-gradient">
                            {profile.name}
                        </h1>
                        <h1 className="reveal-up reveal-delay-3 text-[clamp(1.55rem,6.2vw,4.6rem)] leading-[1.1] text-textMain">
                            {isEnglish ? profile.role.en : profile.role.pt}
                        </h1>
                    </div>

                    <div className="reveal-up reveal-delay-3 flex flex-wrap gap-3 xs:gap-4 sm:gap-5 mt-7 sm:mt-9 items-center relative z-[1]">
                        <a
                            href={socialLinks.github}
                            target='_blank'
                            rel="noopener noreferrer"
                            aria-label="GitHub profile"
                            className="interactive-lift inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-borderSoft bg-surfaceSoft text-textMain hover:border-accentStart/50 hover:text-accentStart"
                        >
                            <SiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a
                            href={socialLinks.linkedin}
                            target='_blank'
                            rel="noopener noreferrer"
                            aria-label="LinkedIn profile"
                            className="interactive-lift inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-borderSoft bg-surfaceSoft text-textMain hover:border-accentStart/50 hover:text-accentStart"
                        >
                            <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a
                            className="interactive-lift inline-flex items-center gap-2.5 border border-accentStart/50 px-4 py-3 sm:px-5 sm:py-4 rounded-xl text-sm sm:text-base lg:text-lg bg-gradient-to-r from-accentStart/15 to-accentEnd/20 text-textMain hover:border-accentStart hover:bg-gradient-to-r hover:from-accentStart/25 hover:to-accentViolet/30"
                            target='_blank'
                            rel="noopener noreferrer"
                            href={resume.file}
                            aria-label={isEnglish ? 'Download resume PDF' : 'Baixar currículo PDF'}
                        >
                            <Download className='w-4 h-4 sm:w-5 sm:h-5' />
                            {isEnglish ? resume.label.en : resume.label.pt}
                        </a>
                    </div>
                </div>
        </section>
    )
}

Home.propTypes = {
    isEnglish: PropTypes.bool.isRequired,
    content: PropTypes.shape({
        profile: PropTypes.object.isRequired,
        resume: PropTypes.object.isRequired,
        socialLinks: PropTypes.object.isRequired,
    }).isRequired,
};
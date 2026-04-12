import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import PropTypes from 'prop-types';

export default function Home({ isEnglish, content }) {
    const { profile, resume, socialLinks } = content;

    return (
        <section aria-labelledby='home-title' className="min-h-screen flex items-center px-4 sm:px-6 md:px-10 lg:px-16 3xl:px-24 pt-24 sm:pt-28 lg:pt-32 pb-10">
                <div className='w-full max-w-10xl mx-auto'>
                    <div className="max-w-5xl">
                        <h1 id='home-title' className="text-[clamp(1.4rem,4vw,3.6rem)] leading-tight">
                            {isEnglish ? profile.greeting.en : profile.greeting.pt}
                        </h1>
                        <h1 className="text-[clamp(2.1rem,9vw,7rem)] leading-[1.05] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accentStart to-accentEnd">
                            {profile.name}
                        </h1>
                        <h1 className="text-[clamp(1.8rem,8vw,6.2rem)] leading-[1.08]">
                            {isEnglish ? profile.role.en : profile.role.pt}
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-3 xs:gap-4 sm:gap-6 mt-6 sm:mt-8 items-center">
                        <a
                            href={socialLinks.github}
                            target='_blank'
                            rel="noopener noreferrer"
                            aria-label="GitHub profile"
                            className="p-1 rounded-lg"
                        >
                            <IoLogoGithub className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 3xl:w-24 3xl:h-24 hover:animate-button-hover"/>
                        </a>
                        <a
                            href={socialLinks.linkedin}
                            target='_blank'
                            rel="noopener noreferrer"
                            aria-label="LinkedIn profile"
                            className="p-1 rounded-lg"
                        >
                            <IoLogoLinkedin className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 3xl:w-24 3xl:h-24 hover:animate-button-hover"/>
                        </a>
                        <a
                            className="inline-flex border-2 border-paragraphcolor px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 rounded-md font-inter text-paragraphcolor text-sm sm:text-base lg:text-lg 2xl:text-xl hover:bg-white hover:text-black hover:animate-button-hover"
                            target='_blank'
                            rel="noopener noreferrer"
                            href={resume.file}
                            aria-label={isEnglish ? 'Download resume PDF' : 'Baixar curriculo PDF'}
                        >
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
import linkedin2 from '../../public/linkedin2.png'
import cv from '../../public/curriculo2024.pdf'
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";



export default function Home() {

    return (
        <>  
            <main>
                <section className="flex items-center min-h-screen">
                    <div className='flex-col'>
                        <div className="mt-6 mx-10 md:mx-32 items-center">
                            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl sm:text-4xl ssm:text-3xl">Olá eu sou o</h1>
                            <h1 className="xl:text-8xl lg:text-7xl md:text-5xl sm:text-5xl ssm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#00FFD1] to-[#0500FF]">
                                Leonardo Mello
                            </h1>
                            <h1 className="xl:text-8xl lg:text-7xl md:text-5xl sm:text-4xl ssm:text-4xl">Engenheiro de Software</h1>
                        </div>
                        <div className="flex gap-6 mt-6 mx-10 md:mx-32 items-center">
                            <a href="https://github.com/leocorreamello" target='_blank' rel="noopener noreferrer">
                                <IoLogoGithub className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"/>
                            </a>
                            <a href="https://www.linkedin.com/in/leocorreamello/" target='_blank' rel="noopener noreferrer">
                                <IoLogoLinkedin className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"/>
                            </a>
                            <a className="flex" target='_blank' rel="noopener noreferrer" href={cv}>
                                <button className="border-2 border-paragraphcolor p-3 rounded-md font-inter text-paragraphcolor text-sm sm:text-base md:text-lg lg:text-xl hover:bg-white hover:text-black">
                                    Baixar Currículo
                                </button>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
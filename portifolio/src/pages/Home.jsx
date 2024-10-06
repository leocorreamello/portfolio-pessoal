import github3 from '../../public/github3.png'
import linkedin2 from '../../public/linkedin2.png'
import whatsapp2 from '../../public/whatsapp2.png'
import cv from '../../public/curriculo2024.pdf'


export default function Home() {

    return (
        <>  
            <main>
                <section className="flex items-center min-h-screen">
                    <div className='flex-col'>
                        <div className="xl:mx-32 lg:mx-32 md:mx-32 sm:mx-32 ssm:mx-10 mx-10">
                            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl sm:text-4xl ssm:text-3xl">Olá eu sou o</h1>
                            <h1 className="xl:text-8xl lg:text-7xl md:text-5xl sm:text-5xl ssm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#00FFD1] to-[#0500FF]">
                                Leonardo Mello
                            </h1>
                            <h1 className="xl:text-8xl lg:text-7xl md:text-5xl sm:text-4xl ssm:text-4xl">Engenheiro de Software</h1>
                        </div>
                        <div className='flex xl:mx-32 lg:mx-32 md:mx-32 sm:mx-32 ssm:mx-10 mx-10 mt-6 gap-6  items-center"'>
                            <a href="https://github.com/leocorreamello" target='_blank'><img src={github3} alt="fotogit" className='size-[77px]'/></a>
                            <a href="https://www.linkedin.com/in/leocorreamello/" target='_blank'><img src={linkedin2} alt="fotolinkedin" className='size-[77px]'/></a>
                            <a className="ssm:hidden md:flex" target='_blank' href={cv}><button className="ssm:hidden md:flex border-2 border-paragraphcolor p-3 rounded-md items-center flex gap-4 font-inter text-paragraphcolor text-lg hover:bg-white hover:text-black">Baixar Currículo</button></a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
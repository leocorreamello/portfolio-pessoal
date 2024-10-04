import github3 from '../../public/github3.png'
import linkedin2 from '../../public/linkedin2.png'
import whatsapp2 from '../../public/whatsapp2.png'
import fotoeu from '../../public/eu5.png'
import html from '../../public/html-5.png'
import css from '../../public/css-3.png'
import js from '../../public/js.png'
import react from '../../public/react.png'
import bootstrap from '../../public/bootstrap.png'
import java from '../../public/java.png'
import git from '../../public/git.png'
import github from '../../public/github.png'
import linkedin from '../../public/linkedin.png'
import whatsapp from '../../public/whatsapp.png'
import curriculo from '../../public/curriculo.png'
import Card from "../components/Card";


export default function Home() {

    return (
        <>  
            <main>
                <section className="flex items-center min-h-screen">
                    <div className='flex-col'>
                        <div className="mx-32">
                            <h1 className="text-6xl">Olá eu sou o</h1>
                            <h1 className="text-8xl bg-clip-text text-transparent bg-gradient-to-r from-[#00FFD1] to-[#0500FF]">
                                Leonardo Mello
                            </h1>
                            <h1 className="text-8xl">Engenheiro de Software</h1>
                        </div>
                        <div className='flex mx-32 mt-6 gap-6'>
                            <a href="https://github.com/leocorreamello" target='_blank'><img src={github3} alt="fotogit" className='size-[77px]'/></a>
                            <a href="https://www.linkedin.com/in/leocorreamello/" target='_blank'><img src={linkedin2} alt="fotolinkedin" className='size-[77px]'/></a>
                            <a href="#"><img src={whatsapp2} alt="fotowhatsapp" className='size-[77px]'/></a>
                        </div>
                    </div>
                </section>
                <section className='mb-72'>
                    <div className="flex items-center min-h-screen justify-center p-4">
                            <img src={fotoeu} alt="minha foto" className='w-[500px] rounded-full outline outline-[#0500FF] absolute mr-[1150px]'/>
                            <div className="bg-[#50616B] rounded-[40px] border-4 border-gradient p-6 w-full max-w-6xl">
                                <div className='ml-[400px] mr-[100px] mt-[50px]'>
                                    <h1 className="text-4xl md:text-6xl text-center">Leonardo Mello</h1>
                                    <p className="text-xl md:text-3xl text-justify mt-4">
                                        Olá, me chamo Leonardo Mello, tenho 19 anos de idade e atualmente estou cursando Engenharia de Software 
                                        na FIAP. Estou à procura do meu primeiro estágio na área.
                                    </p>
                                    <h2 className="text-2xl md:text-4xl mt-4 text-center">Tecnologias</h2>
                                    <div className='flex flex-wrap justify-center mt-4 gap-4'>
                                        <img src={html} alt="fotohtml" className="w-16 h-16 md:w-20 md:h-20"/>
                                        <img src={css} alt="fotocss" className="w-16 h-16 md:w-20 md:h-20"/>
                                        <img src={js} alt="fotojs" className="w-16 h-16 md:w-20 md:h-20"/>
                                        <img src={react} alt="fotoreact" className="w-16 h-16 md:w-20 md:h-20"/>
                                        <img src={bootstrap} alt="fotoboot" className="w-16 h-16 md:w-20 md:h-20"/>
                                        <img src={java} alt="fotojava" className="w-16 h-16 md:w-20 md:h-20"/>
                                        <img src={git} alt="fotogit" className="w-16 h-16 md:w-20 md:h-20"/>
                                    </div>
                                    <h2 className="text-2xl md:text-4xl mt-4 text-center">Contato</h2>
                                    <div className='flex flex-wrap justify-center mt-4 gap-4'>
                                        <a href="https://github.com/leocorreamello" target='_blank'><img src={github} alt="fotogithub" className="w-16 h-16 md:w-20 md:h-20"/></a>
                                        <a href="https://www.linkedin.com/in/leocorreamello/" target='_blank'><img src={linkedin} alt="fotolinkedin" className="w-16 h-16 md:w-20 md:h-20"/></a>
                                        <a href="#"><img src={whatsapp} alt="fotowhatsapp" className="w-16 h-16 md:w-20 md:h-20"/></a>
                                        <a href="#"><img src={curriculo} alt="fotocurriculo" className="w-16 h-16 md:w-20 md:h-20"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <Card/>
                    </section>
                </main>
        </>
    )
}
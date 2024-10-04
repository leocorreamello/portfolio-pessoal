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
            </main>
        </>
    )
}
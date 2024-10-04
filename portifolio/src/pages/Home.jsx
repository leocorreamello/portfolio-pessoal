import github3 from '../../public/github3.png'
import linkedin2 from '../../public/linkedin2.png'
import whatsapp2 from '../../public/whatsapp2.png'
import seta from '../../public/seta.png'


export default function Home() {

    return (
        <>  
            <main className="flex items-center min-h-screen">
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
            </main>
            <div className='flex justify-center'>
                <div className='flex-col mt-[-10%]'>
                    <h1 className='text-[20px]'>Formulário de Contato</h1>
                    <div className='flex justify-center'>
                        <img src={seta} alt="seta" className='size-[40px]'/>
                    </div>
                </div>
            </div>
            <div className='flex justify-center p-4'>
                <div className='flex-col text-center w-full max-w-4xl'>
                    <h1 className='text-4xl md:text-6xl mb-4'>Contato</h1>
                    <h1 className='text-xl md:text-2xl mb-4'>
                        Preencha o formulário abaixo para entrar em contato comigo. 
                        Deixe seu feedback sobre o site, tire dúvidas sobre algo ou me contrate!
                    </h1>
                    <div className='bg-white text-black rounded-[20px] p-4'>
                        <form onSubmit=''>
                            <div className='flex flex-col md:flex-row justify-center items-center mb-4 mt-4'>
                                <div className='mt-4 md:mr-3 w-full md:w-auto'>
                                    <label htmlFor="nome">Nome</label><br />
                                    <input
                                    className='border-2 border-black p-2 w-full md:w-auto'
                                    type="text"
                                    id="nome"
                                    placeholder='Digite aqui seu nome...'
                                    required
                                    />
                                </div>
                                <div className='mt-4 w-full md:w-auto'>
                                    <label htmlFor="email">Email</label><br />
                                    <input
                                    className='border-2 border-black p-2 w-full md:w-auto'
                                    type="email"
                                    id="email"
                                    placeholder='seuemail@email.com'
                                    required
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="mensagem">Mensagem</label><br />
                                <textarea
                                className='border-2 border-black p-2 w-full h-32 md:w-[500px] md:h-20'
                                id="mensagem"
                                placeholder='Deixe aqui sua mensagem de feedback, dúvida ou contato'
                                required
                                />
                            </div>
                            <div className='flex justify-center'>
                                <button type="submit" className='bg-gradient-to-r from-[#00aeff] to-[#0500FF] text-white p-2 rounded-md'>
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
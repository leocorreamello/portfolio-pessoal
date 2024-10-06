import { Link } from 'react-router-dom';
import projeto1 from '../../public/westwise.png'
import projeto2 from '../../public/e-commerce.png'
import projeto3 from '../../public/minerede.png'
import projeto4 from '../../public/lixeira.png'
import projeto5 from '../../public/portfolio.png'
import projeto6 from '../../public/melodiasite.png'
import codigo from '../../public/codigo.jpg'
import site from '../../public/site.jpg'
import html from '../../public/html-5.png'
import css from '../../public/css-3.png'
import js from '../../public/js.png'
import react from '../../public/react.png'
import bootstrap from '../../public/bootstrap.png'
import sass from '../../public/sass.png'
import arduino from '../../public/arduino.png'
import c from '../../public/c.png'
import tailwind from '../../public/tailwind-css.svg'


export default function Projetos() {

    return (
        <>
            <main>
            <div className='flex-col justify-center justify-items-center text-center'>
                <div>
                    <h1 className='text-6xl'>Projetos</h1>
                </div>
                <div className='flex justify-center mt-[40px] gap-20'>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>WasteWise</h1>
                        <img src={projeto1} alt="projeto1" className='w-96 rounded-[40px] border-gradient'/>
                        <div className='flex justify-center gap-4 mt-4'>
                            <img src={html} alt="html" className="w-10 h-10"/>
                            <img src={css} alt="css" className="w-10 h-10"/>
                            <img src={js} alt="js" className="w-10 h-10"/>
                        </div>
                        <div className='flex gap-3 mt-[10px]'>
                            <a href="https://github.com/peguidotte/WasteWise" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <a href="https://waste-wise-ibmn.vercel.app/" target='_blank'><img src={site} alt="linksite"/></a>
                        </div>
                    </div>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>E-Commerce</h1>
                        <img src={projeto2} alt="projeto2" className='w-96 rounded-[40px] border-gradient'/>
                        <div className='flex justify-center gap-4 mt-4'>
                            <img src={html} alt="html" className="w-10 h-10"/>
                            <img src={css} alt="css" className="w-10 h-10"/>
                            <img src={js} alt="js" className="w-10 h-10"/>
                            <img src={bootstrap} alt="boostrap" className="w-10 h-10"/>
                        </div>
                        <div className='flex gap-3 mt-[10px]'>
                            <a href="https://github.com/leocorreamello/E-commerce-CP04" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <a href="https://leocorreamello.github.io/E-commerce-CP04/" target='_blank'><img src={site} alt="linksite"/></a>
                        </div>
                    </div>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>Mini Rede Social</h1>
                        <img src={projeto3} alt="projeto3" className='w-96 rounded-[40px] border-gradient'/>
                        <div className='flex justify-center gap-4 mt-4'>
                            <img src={html} alt="html" className="w-10 h-10"/>
                            <img src={css} alt="css" className="w-10 h-10"/>
                            <img src={js} alt="js" className="w-10 h-10"/>
                        </div>
                        <div className='flex gap-3 mt-[10px]'>
                            <a href="https://github.com/leocorreamello/CP03-Web-Mini-Red-Social" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <a href="https://leocorreamello.github.io/CP03-Web-Mini-Red-Social/" target='_blank'><img src={site} alt="linksite"/></a>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-[40px] gap-20'>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>Lixeira Inteligente</h1>
                        <img src={projeto4} alt="projeto4" className='w-96 rounded-[40px] border-gradient'/>
                        <div className='flex justify-center gap-4 mt-4'>
                            <img src={arduino} alt="arduino" className="w-10 h-10"/>
                            <img src={c} alt="c++" className="w-10 h-10"/>
                        </div>
                        <div className='flex gap-3 mt-[10px]'>
                            <a href="https://github.com/leocorreamello/EDGE---GS2024?tab=readme-ov-file" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <a href="https://wokwi.com/projects/399705116640261121" target='_blank'><img src={site} alt="linksite"/></a>
                        </div>
                    </div>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>Esse Portfólio</h1>
                        <img src={projeto5} alt="projeto5" className='w-96 rounded-[40px] border-gradient p-5'/>
                        <div className='flex justify-center gap-4 mt-4'>
                            <img src={html} alt="html" className="w-10 h-10"/>
                            <img src={css} alt="css" className="w-10 h-10"/>
                            <img src={js} alt="js" className="w-10 h-10"/>
                            <img src={tailwind} alt="tailwind" className="w-10 h-10" />
                            <img src={react} alt="react" className="w-10 h-10"/>
                        </div>
                        <div className='flex gap-3 mt-[10px] mb-12'>
                            <a href="https://github.com/leocorreamello/portfolio-pessoal" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <Link to="/" target='_blank'><img src={site} alt="linksite"/></Link>
                        </div>
                    </div>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>App Melodia</h1>
                        <img src={projeto6} alt="projeto5" className='w-96 rounded-[40px] border-gradient'/>
                        <div className='flex justify-center gap-4 mt-4'>
                            <img src={html} alt="html" className="w-10 h-10"/>
                            <img src={css} alt="css" className="w-10 h-10"/>
                            <img src={js} alt="js" className="w-10 h-10"/>
                            <img src={sass} alt="sass" className="w-10 h-10"/>
                            <img src={bootstrap} alt="bootstrap" className="w-10 h-10"/>
                            <img src={tailwind} alt="tailwind" className="w-10 h-10" />
                            <img src={react} alt="react" className="w-10 h-10"/>
                        </div>
                        <div className='flex gap-3 mt-[10px] mb-12'>
                            <a href="https://github.com/peguidotte/melodia" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <Link to="https://melodia-bay.vercel.app/" target='_blank'><img src={site} alt="linksite"/></Link>
                        </div>
                    </div>
                </div>
            </div>
          </main>
        </>
    )
}
import { Link } from 'react-router-dom';
import projeto1 from '../../public/westwise.png'
import projeto2 from '../../public/e-commerce.png'
import projeto3 from '../../public/minerede.png'
import projeto4 from '../../public/lixeira.png'
import projeto5 from '../../public/portfolio.png'
import codigo from '../../public/codigo.jpg'
import site from '../../public/site.jpg'

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
                        <div className='flex gap-3 mt-[10px]'>
                            <a href="https://github.com/peguidotte/WasteWise" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <a href="https://waste-wise-ibmn.vercel.app/" target='_blank'><img src={site} alt="linksite"/></a>
                        </div>
                    </div>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>E-Commerce</h1>
                        <img src={projeto2} alt="projeto2" className='w-96 rounded-[40px] border-gradient'/>
                        <div className='flex gap-3 mt-[10px]'>
                            <a href="https://github.com/leocorreamello/E-commerce-CP04" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <a href="https://leocorreamello.github.io/E-commerce-CP04/" target='_blank'><img src={site} alt="linksite"/></a>
                        </div>
                    </div>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>Mini Rede Social</h1>
                        <img src={projeto3} alt="projeto3" className='w-96 rounded-[40px] border-gradient'/>
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
                        <div className='flex gap-3 mt-[10px]'>
                            <a href="https://github.com/leocorreamello/EDGE---GS2024?tab=readme-ov-file" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <a href="https://wokwi.com/projects/399705116640261121" target='_blank'><img src={site} alt="linksite"/></a>
                        </div>
                    </div>
                    <div className='flex-col justify-center'>
                        <h1 className='text-center text-3xl'>Esse Portfólio</h1>
                        <img src={projeto5} alt="projeto5" className='w-96 rounded-[40px] border-gradient p-5'/>
                        <div className='flex gap-3 mt-[10px] mb-12'>
                            <a href="https://github.com/leocorreamello/CP05-WebDev" target='_blank'><img src={codigo} alt="codigosite"/></a>
                            <Link to="/" target='_blank'><img src={site} alt="linksite"/></Link>
                        </div>
                    </div>
                </div>
            </div>
          </main>
        </>
    )
}
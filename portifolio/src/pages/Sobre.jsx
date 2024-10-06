import React, { useState } from 'react';
import fotoeu from '../../public/eu5.png';
import html from '../../public/html-5.png';
import css from '../../public/css-3.png';
import js from '../../public/js.png';
import react from '../../public/react.png';
import bootstrap from '../../public/bootstrap.png';
import java from '../../public/java.png';
import git from '../../public/git.png';
import github from '../../public/github.png';
import linkedin from '../../public/linkedin.png';
import curriculo from '../../public/curriculo.png';
import cv from '../../public/curriculo2024.pdf';
import sass from '../../public/sass.png';
import arduino from '../../public/arduino.png';
import c from '../../public/c.png';
import tailwind from '../../public/tailwind-css.svg';

const Sobre = () => {
    const [hoveredImg, setHoveredImg] = useState(null);

    const handleMouseEnter = (alt) => {
        setHoveredImg(alt);
    };

    const handleMouseLeave = () => {
        setHoveredImg(null);
    };

    const images = [
        { src: html, alt: 'HTML' },
        { src: css, alt: 'CSS' },
        { src: js, alt: 'JavaScript' },
        { src: react, alt: 'React' },
        { src: bootstrap, alt: 'Bootstrap' },
        { src: java, alt: 'Java' },
        { src: git, alt: 'Git' },
        { src: sass, alt: 'Sass' },
        { src: arduino, alt: 'Arduino' },
        { src: c, alt: 'C++' },
        { src: tailwind, alt: 'Tailwind' },
    ];

    return (
        <>
            <main className='mb-72 flex items-center justify-center min-h-screen'>
                <div className="flex flex-col lg:flex-row items-center justify-center p-4 w-full max-w-6xl">
                    <img src={fotoeu} alt="minha foto" className='w-64 md:w-80 lg:w-[500px] rounded-full outline outline-[#0500FF] lg:absolute lg:mr-[1150px]' />
                    <div className="bg-[#50616B] rounded-[40px] border-4 border-gradient p-6 w-full mt-8 lg:mt-0">
                        <div className='lg:ml-[400px] lg:mr-[100px] mt-[50px]'>
                            <h1 className="text-3xl md:text-4xl lg:text-6xl text-center">Leonardo Mello</h1>
                            <p className="text-lg md:text-xl lg:text-3xl text-justify mt-4">
                                Olá, meu nome é Leonardo Mello, tenho 19 anos e estou cursando Engenharia de Software na FIAP. 
                                Atualmente, trabalho na área de TI da empresa Ticket.
                            </p>
                            <h2 className="text-xl md:text-2xl lg:text-4xl mt-4 text-center">Tecnologias</h2>
                            <div className='flex flex-wrap justify-center mt-4 gap-4'>
                                {images.map((image) => (
                                    <div
                                        key={image.alt}
                                        className="relative"
                                        onMouseEnter={() => handleMouseEnter(image.alt)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img src={image.src} alt={image.alt} className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                                        {hoveredImg === image.alt && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-xs md:text-sm lg:text-lg">
                                                {image.alt}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <h2 className="text-xl md:text-2xl lg:text-4xl mt-4 text-center">Contato</h2>
                            <div className='flex flex-wrap justify-center mt-4 gap-4'>
                                <a href="https://github.com/leocorreamello" target='_blank' rel="noopener noreferrer">
                                    <img src={github} alt="GitHub" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                                </a>
                                <a href="https://www.linkedin.com/in/leocorreamello/" target='_blank' rel="noopener noreferrer">
                                    <img src={linkedin} alt="LinkedIn" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                                </a>
                                <a href={cv} target='_blank' rel="noopener noreferrer">
                                    <img src={curriculo} alt="Currículo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Sobre;
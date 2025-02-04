import React, { useState, useEffect } from 'react';
import { Link, Events, scrollSpy } from 'react-scroll';
import logo from "../../public/logo.png";
import menu from "../../public/iconmenu.png";
import flagEua from "../../public/eua.png";
import flagBr from "../../public/brazil.png";

export default function Header({ toggleLanguage, isEnglish }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    return (
        <>
            <header className="bg-neutral-900 fixed top-0 w-full flex text-white justify-between h-20 sm:h-24 md:h-28 lg:h-32 items-center text-2xl px-8 lg:px-16 z-50 shadow-lg">
                <div>
                    <img className="w-1/4" src={logo} alt="logo" />
                </div>
                <nav className="hidden lg:flex space-x-6 items-center">
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleLanguage} className="flex items-center gap-2 bg-gray-800 p-1 rounded-md hover:animate-button-hover">
                            <img src={isEnglish ? flagBr : flagEua} alt="flags" className="w-4 h-4" />
                            <span className="text-sm">{isEnglish ? 'Português' : 'English'}</span>
                        </button>
                        <div className="h-6 border-l border-gray-600"></div>
                    </div>
                    <ul className="flex space-x-6">
                        <li className={`cursor-pointer hover:underline hover:underline-offset-4 ${activeSection === 'home' ? 'underline' : ''}`}>
                            <Link to="home" smooth={true} duration={500} spy={true} offset={-80} onSetActive={() => setActiveSection('home')}>
                                {isEnglish ? 'Home' : 'Principal'}
                            </Link>
                        </li>
                        <li className={`cursor-pointer hover:underline hover:underline-offset-4 ${activeSection === 'sobre' ? 'underline' : ''}`}>
                            <Link to="sobre" smooth={true} duration={500} spy={true} offset={-80} onSetActive={() => setActiveSection('sobre')}>
                                {isEnglish ? 'About' : 'Sobre'}
                            </Link>
                        </li>
                        <li className={`cursor-pointer hover:underline hover:underline-offset-4 ${activeSection === 'projetos' ? 'underline' : ''}`}>
                            <Link to="projetos" smooth={true} duration={500} spy={true} offset={-80} onSetActive={() => setActiveSection('projetos')}>
                                {isEnglish ? 'Projects' : 'Projetos'}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="lg:hidden">
                    <button onClick={toggleMenu}>
                        <img src={menu} alt="icon-menu" className="w-10 hover:animate-button-hover" />
                    </button>
                </div>
            </header>
            {isMenuOpen && (
                <div className="lg:hidden bg-neutral-900 text-white fixed top-20 w-full z-40 shadow-lg rounded-b-lg">
                    <div className="flex items-center justify-between p-4">
                        <button onClick={toggleLanguage} className="flex items-center gap-2 bg-gray-800 p-1 rounded-md hover:animate-button-hover">
                            <img src={isEnglish ? flagBr : flagEua} alt="flags" className="w-4 h-4" />
                            <span className="text-sm">{isEnglish ? 'Português' : 'English'}</span>
                        </button>
                        <button onClick={toggleMenu} className="text-white text-2xl ml-4">&times;</button>
                    </div>
                    <ul className="flex flex-col space-y-4 p-4 text-right">
                        <li className={`cursor-pointer hover:underline hover:underline-offset-4 ${activeSection === 'home' ? 'underline' : ''}`}>
                            <Link to="home" smooth={true} duration={500} spy={true} offset={-80} onSetActive={() => setActiveSection('home')} onClick={toggleMenu}>
                                {isEnglish ? 'Home' : 'Principal'}
                            </Link>
                        </li>
                        <li className={`cursor-pointer hover:underline hover:underline-offset-4 ${activeSection === 'sobre' ? 'underline' : ''}`}>
                            <Link to="sobre" smooth={true} duration={500} spy={true} offset={-80} onSetActive={() => setActiveSection('sobre')} onClick={toggleMenu}>
                                {isEnglish ? 'About' : 'Sobre'}
                            </Link>
                        </li>
                        <li className={`cursor-pointer hover:underline hover:underline-offset-4 ${activeSection === 'projetos' ? 'underline' : ''}`}>
                            <Link to="projetos" smooth={true} duration={500} spy={true} offset={-80} onSetActive={() => setActiveSection('projetos')} onClick={toggleMenu}>
                                {isEnglish ? 'Projects' : 'Projetos'}
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
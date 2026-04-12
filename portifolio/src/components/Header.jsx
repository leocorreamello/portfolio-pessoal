import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, scrollSpy } from 'react-scroll';
import logo from "../../public/logo.png";
import menu from "../../public/iconmenu.png";
import flagEua from "../../public/eua.png";
import flagBr from "../../public/brazil.png";

export default function Header({ toggleLanguage, isEnglish }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navItems = [
        { key: 'home', label: isEnglish ? 'Home' : 'Principal' },
        { key: 'sobre', label: isEnglish ? 'About' : 'Sobre' },
        { key: 'projetos', label: isEnglish ? 'Projects' : 'Projetos' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        scrollSpy.update();
    }, []);

    return (
        <>
            <header className="bg-neutral-900/95 backdrop-blur-sm fixed top-0 w-full text-white h-16 sm:h-20 lg:h-24 px-4 sm:px-6 lg:px-10 3xl:px-16 z-50 shadow-lg">
                <div className="h-full max-w-10xl mx-auto flex items-center justify-between gap-4">
                    <img className="w-32 xs:w-36 sm:w-44 lg:w-52 3xl:w-64 shrink-0" src={logo} alt="Leonardo logo" />

                    <nav className="hidden lg:flex items-center gap-4 xl:gap-6 3xl:gap-8" aria-label="Main navigation">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleLanguage}
                                aria-label={isEnglish ? 'Switch to Portuguese' : 'Switch to English'}
                                className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md hover:animate-button-hover"
                            >
                                <img src={isEnglish ? flagBr : flagEua} alt="language flag" className="w-4 h-4" />
                                <span className="text-sm xl:text-base">{isEnglish ? 'Português' : 'English'}</span>
                            </button>
                            <div className="h-6 border-l border-gray-600"></div>
                        </div>
                        <ul className="flex gap-5 xl:gap-7 text-sm xl:text-lg 3xl:text-xl">
                            {navItems.map((item) => (
                                <li
                                    key={item.key}
                                    className={`cursor-pointer hover:underline hover:underline-offset-4 ${activeSection === item.key ? 'underline' : ''}`}
                                >
                                    <Link
                                        to={item.key}
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        offset={-90}
                                        onSetActive={() => setActiveSection(item.key)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="lg:hidden flex items-center gap-3">
                        <button
                            onClick={toggleLanguage}
                            aria-label={isEnglish ? 'Switch to Portuguese' : 'Switch to English'}
                            className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md hover:animate-button-hover"
                        >
                            <img src={isEnglish ? flagBr : flagEua} alt="language flag" className="w-4 h-4" />
                            <span className="text-sm">{isEnglish ? 'PT' : 'EN'}</span>
                        </button>
                        <button onClick={toggleMenu} aria-label="Open menu">
                            <img src={menu} alt="menu icon" className="w-8 sm:w-9 hover:animate-button-hover" />
                        </button>
                    </div>
                </div>
            </header>
            {isMenuOpen && (
                <div className="lg:hidden bg-neutral-900 text-white fixed top-16 sm:top-20 w-full z-40 shadow-lg rounded-b-lg">
                    <div className="flex items-center justify-between p-4">
                        <button
                            onClick={toggleLanguage}
                            aria-label={isEnglish ? 'Switch to Portuguese' : 'Switch to English'}
                            className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md hover:animate-button-hover"
                        >
                            <img src={isEnglish ? flagBr : flagEua} alt="language flag" className="w-4 h-4" />
                            <span className="text-sm">{isEnglish ? 'Português' : 'English'}</span>
                        </button>
                        <button onClick={toggleMenu} className="text-white text-2xl ml-4" aria-label="Close menu">&times;</button>
                    </div>
                    <ul className="flex flex-col gap-4 px-4 pb-6 text-right text-lg">
                        {navItems.map((item) => (
                            <li
                                key={item.key}
                                className={`cursor-pointer hover:underline hover:underline-offset-4 ${activeSection === item.key ? 'underline' : ''}`}
                            >
                                <Link
                                    to={item.key}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    offset={-80}
                                    onSetActive={() => setActiveSection(item.key)}
                                    onClick={toggleMenu}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

Header.propTypes = {
    toggleLanguage: PropTypes.func.isRequired,
    isEnglish: PropTypes.bool.isRequired,
};
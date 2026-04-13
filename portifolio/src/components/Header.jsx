import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, scrollSpy } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import logo from "../../public/logo.png";
import flagEua from "../../public/eua.png";
import flagBr from "../../public/brazil.png";

export default function Header({ toggleLanguage, isEnglish }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navItems = [
        { key: 'home', label: isEnglish ? 'Home' : 'Principal' },
        { key: 'sobre', label: isEnglish ? 'About' : 'Sobre' },
        { key: 'timeline', label: isEnglish ? 'Timeline' : 'Linha do tempo' },
        { key: 'certificates', label: isEnglish ? 'Certificates' : 'Certificados' },
        { key: 'social-impact', label: isEnglish ? 'Impact' : 'Ações sociais' },
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
            <header className="fixed top-0 w-full text-white h-16 sm:h-20 lg:h-24 px-4 sm:px-6 lg:px-10 3xl:px-16 z-50 border-b border-borderSoft/90 bg-background/82 backdrop-blur-xl">
                <div className="h-full max-w-10xl mx-auto flex items-center justify-between gap-4">
                    <img className="w-32 xs:w-36 sm:w-44 lg:w-52 3xl:w-64 shrink-0" src={logo} alt="Leonardo logo" />

                    <nav className="hidden lg:flex items-center gap-4 xl:gap-6 3xl:gap-8" aria-label="Main navigation">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleLanguage}
                                aria-label={isEnglish ? 'Switch to Portuguese' : 'Switch to English'}
                                className="flex items-center gap-2 bg-surfaceSoft border border-borderSoft px-3 py-2 rounded-xl hover:bg-surfaceMuted hover:animate-button-hover"
                            >
                                <img src={isEnglish ? flagBr : flagEua} alt="language flag" className="w-4 h-4" />
                                <span className="text-sm xl:text-base">{isEnglish ? 'Português' : 'English'}</span>
                            </button>
                            <div className="h-6 border-l border-borderSoft"></div>
                        </div>
                        <ul className="flex gap-4 xl:gap-6 text-sm xl:text-base text-textMuted">
                            {navItems.map((item) => (
                                <li
                                    key={item.key}
                                    className={`cursor-pointer px-3.5 py-2 rounded-xl border interactive-lift ${activeSection === item.key ? 'border-accentStart/45 text-textMain bg-surfaceSoft shadow-glow' : 'border-transparent hover:border-borderSoft/90 hover:bg-surfaceSoft/60 hover:text-textMain'}`}
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
                            className="flex items-center gap-2 bg-surfaceSoft border border-borderSoft px-3 py-2 rounded-xl hover:bg-surfaceMuted"
                        >
                            <img src={isEnglish ? flagBr : flagEua} alt="language flag" className="w-4 h-4" />
                            <span className="text-sm">{isEnglish ? 'PT' : 'EN'}</span>
                        </button>
                        <button onClick={toggleMenu} aria-label="Open menu" className="p-1 rounded-lg border border-borderSoft bg-surfaceSoft hover:bg-surfaceMuted">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>
            {isMenuOpen && (
                <div className="lg:hidden glass-panel text-white fixed top-16 sm:top-20 left-2 right-2 z-40 shadow-glow rounded-2xl">
                    <div className="flex items-center justify-between p-4 border-b border-borderSoft">
                        <button
                            onClick={toggleLanguage}
                            aria-label={isEnglish ? 'Switch to Portuguese' : 'Switch to English'}
                            className="flex items-center gap-2 bg-surfaceSoft border border-borderSoft px-3 py-2 rounded-xl hover:bg-surfaceMuted"
                        >
                            <img src={isEnglish ? flagBr : flagEua} alt="language flag" className="w-4 h-4" />
                            <span className="text-sm">{isEnglish ? 'Português' : 'English'}</span>
                        </button>
                        <button onClick={toggleMenu} className="text-white ml-4 p-1 rounded-lg border border-borderSoft bg-surfaceSoft" aria-label="Close menu">
                            <X size={20} />
                        </button>
                    </div>
                    <ul className="flex flex-col gap-2 px-4 py-4 text-right text-lg">
                        {navItems.map((item) => (
                            <li
                                key={item.key}
                                className={`cursor-pointer rounded-xl px-3 py-2 ${activeSection === item.key ? 'bg-surfaceSoft text-textMain border border-accentStart/35' : 'text-textMuted hover:text-textMain hover:bg-surfaceSoft/60 border border-transparent'}`}
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
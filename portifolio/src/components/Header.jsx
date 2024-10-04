import React, { useState } from 'react';
import { Link } from 'react-scroll';
import logo from "../../public/logo.png";
import menu from "../../public/iconmenu.png";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="bg-black fixed top-0 w-full flex text-white justify-between h-20 items-center text-2xl px-4 z-50">
                <div>
                    <img className="w-1/4" src={logo} alt="logo" />
                </div>
                <nav className="hidden lg:flex space-x-4">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="home" smooth={true} duration={500}>
                                Principal
                            </Link>
                        </li>
                        <li>
                            <Link to="sobre" smooth={true} duration={500}>
                                Sobre
                            </Link>
                        </li>
                        <li>
                            <Link to="projetos" smooth={true} duration={500}>
                                Projetos
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="lg:hidden">
                    <button onClick={toggleMenu}>
                        <img src={menu} alt="icon-menu" className="w-10" />
                    </button>
                </div>
            </header>
            {isMenuOpen && (
                <div className="lg:hidden bg-black text-white fixed top-20 w-full z-40">
                    <ul className="flex flex-col space-y-4 p-4">
                        <li>
                            <Link to="home" smooth={true} duration={500} onClick={toggleMenu}>
                                Principal
                            </Link>
                        </li>
                        <li>
                            <Link to="sobre" smooth={true} duration={500} onClick={toggleMenu}>
                                Sobre
                            </Link>
                        </li>
                        <li>
                            <Link to="projetos" smooth={true} duration={500} onClick={toggleMenu}>
                                Projetos
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
import React from 'react';
import { Link } from 'react-scroll';
import logo from "../../public/logo.png";

export default function Header() {
    return (
        <>
            <header className="bg-black flex text-white justify-around h-20 items-center text-2xl">
                <div>
                    <img className="w-1/4" src={logo} alt="logo" />
                </div>
                <nav>
                    <ul className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl ssm-text-1xl flex space-x-10">
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
            </header>
        </>
    )
}
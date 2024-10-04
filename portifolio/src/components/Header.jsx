import { NavLink } from "react-router-dom";
import logo from "../../public/logo.png";

export default function Header() {
    return (
        <>
            <header className="bg-black flex text-white justify-around h-20 items-center text-2xl">
                <div>
                    <img className="w-1/4" src={logo} alt="logo" />
                </div>
                <nav>
                    <ul className="flex gap-6">
                        <li><NavLink to="/">Principal</NavLink></li>
                        <li><NavLink to="/sobre">Sobre mim</NavLink></li>
                        <li><NavLink to="/projetos">Projetos</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
import { useEffect, useState } from 'react';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from './pages/Home.jsx';
import Sobre from './pages/Sobre.jsx';
import Projetos from './pages/Projetos.jsx';
import { usePortfolioContent } from './hooks/usePortfolioContent';

function App() {
  const { content } = usePortfolioContent();

  const [isEnglish, setIsEnglish] = useState(() => {
    const savedLanguage = localStorage.getItem('isEnglish');
    return savedLanguage ? JSON.parse(savedLanguage) : true;
  });

  useEffect(() => {
    document.title = isEnglish ? 'Leonardo Mello | Portfolio' : 'Leonardo Mello | Portfólio';
  }, [isEnglish]);

  const toggleLanguage = () => {
    setIsEnglish(prevState => {
      const newState = !prevState;
      localStorage.setItem('isEnglish', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className='bg-background text-textMain scroll-smooth'>
      <Header toggleLanguage={toggleLanguage} isEnglish={isEnglish} />
      <section id="home">
        <Home isEnglish={isEnglish} content={content} />
      </section>
      <section id="sobre">
        <Sobre isEnglish={isEnglish} content={content} />
      </section>
      <section id="projetos">
        <Projetos isEnglish={isEnglish} content={content} />
      </section>
      <Footer content={content} />
    </div>
  )
}

export default App

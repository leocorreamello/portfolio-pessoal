import React, { useState, useEffect } from 'react';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from './pages/Home.jsx';
import Sobre from './pages/Sobre.jsx';
import Projetos from './pages/Projetos.jsx';

function App() {
  const [isEnglish, setIsEnglish] = useState(() => {
    const savedLanguage = localStorage.getItem('isEnglish');
    return savedLanguage ? JSON.parse(savedLanguage) : true;
  });

  const toggleLanguage = () => {
    setIsEnglish(prevState => {
      const newState = !prevState;
      localStorage.setItem('isEnglish', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div>
      <Header toggleLanguage={toggleLanguage} isEnglish={isEnglish} />
      <section id="home">
        <Home isEnglish={isEnglish} />
      </section>
      <section id="sobre">
        <Sobre isEnglish={isEnglish} />
      </section>
      <section id="projetos">
        <Projetos isEnglish={isEnglish} />
      </section>
      <Footer isEnglish={isEnglish} />
    </div>
  )
}

export default App

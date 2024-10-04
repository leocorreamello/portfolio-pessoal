import React from 'react';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from './pages/Home.jsx';
import Sobre from './pages/Sobre.jsx';
import Projetos from './pages/Projetos.jsx';

function App() {

  return (
    <div>
      <Header />
      <section id="home">
        <Home />
      </section>
      <section id="sobre">
        <Sobre />
      </section>
      <section id="projetos">
        <Projetos />
      </section>
      <Footer />
    </div>
  )
}

export default App

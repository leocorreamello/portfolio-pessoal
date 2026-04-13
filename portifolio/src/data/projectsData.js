import projeto1 from '../../public/westwise.png';
import projeto2 from '../../public/e-commerce.png';
import projeto3 from '../../public/minerede.png';
import projeto4 from '../../public/lixeira.png';
import projeto5 from '../../public/portfolio.png';
import projeto6 from '../../public/melodiasite.png';

import html from '../../public/html-5.png';
import css from '../../public/css-3.png';
import js from '../../public/js.png';
import react from '../../public/react.png';
import bootstrap from '../../public/bootstrap.png';
import sass from '../../public/sass.png';
import arduino from '../../public/arduino.png';
import cpp from '../../public/c.png';
import tailwind from '../../public/tailwind-css.svg';
import java from '../../public/java.png';
import git from '../../public/git.png';

export const technologies = [
  { id: 'html', name: 'HTML', icon: html },
  { id: 'css', name: 'CSS', icon: css },
  { id: 'js', name: 'JavaScript', icon: js },
  { id: 'react', name: 'React', icon: react },
  { id: 'bootstrap', name: 'Bootstrap', icon: bootstrap },
  { id: 'java', name: 'Java', icon: java },
  { id: 'git', name: 'Git', icon: git },
  { id: 'sass', name: 'Sass', icon: sass },
  { id: 'arduino', name: 'Arduino', icon: arduino },
  { id: 'cpp', name: 'C++', icon: cpp },
  { id: 'tailwind', name: 'Tailwind', icon: tailwind },
];

export const projects = [
  {
    id: 'wastewise',
    title: 'WasteWise',
    image: projeto1,
    techIds: ['html', 'css', 'js'],
    codeUrl: 'https://github.com/peguidotte/WasteWise',
    liveUrl: 'https://waste-wise-ibmn.vercel.app/',
  },
  {
    id: 'mini-rede-social',
    title: 'Mini Rede Social',
    image: projeto3,
    techIds: ['html', 'css', 'js'],
    codeUrl: 'https://github.com/leocorreamello/CP03-Web-Mini-Red-Social',
    liveUrl: 'https://leocorreamello.github.io/CP03-Web-Mini-Red-Social/',
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce',
    image: projeto2,
    techIds: ['html', 'css', 'js', 'bootstrap'],
    codeUrl: 'https://github.com/leocorreamello/E-commerce-CP04',
    liveUrl: 'https://leocorreamello.github.io/E-commerce-CP04/',
  },
  {
    id: 'lixeira-inteligente',
    title: 'Lixeira Inteligente',
    image: projeto4,
    techIds: ['arduino', 'cpp'],
    codeUrl: 'https://github.com/leocorreamello/EDGE---GS2024?tab=readme-ov-file',
    liveUrl: 'https://wokwi.com/projects/399705116640261121',
  },
  {
    id: 'portfolio-pessoal',
    title: 'Portfólio Pessoal',
    image: projeto5,
    techIds: ['html', 'css', 'js', 'tailwind', 'react'],
    codeUrl: 'https://github.com/leocorreamello/portfolio-pessoal',
    liveUrl: '/',
  },
  {
    id: 'app-melodia',
    title: 'App Melodia',
    image: projeto6,
    techIds: ['html', 'css', 'js', 'sass', 'bootstrap', 'react'],
    codeUrl: 'https://github.com/peguidotte/melodia',
    liveUrl: 'https://melodia-bay.vercel.app/',
  },
];

import fotoeu from '../../public/eu8.png';
import githubIcon from '../../public/github.png';
import linkedinIcon from '../../public/linkedin.png';
import curriculoIcon from '../../public/curriculo.png';
import cvFile from '../../public/curriculo2024.pdf';

export const profileData = {
  name: 'Leonardo Mello',
  greeting: {
    en: 'Hello, I am',
    pt: 'Ola eu sou o',
  },
  role: {
    en: 'Software Engineer',
    pt: 'Engenheiro de Software',
  },
  about: {
    en: "Hello, I'm Leonardo Mello, I'm 20 years old and I'm studying Software Engineering at FIAP. Currently, I work as an intern at Ticket, integrating the Digital Channels team as a Developer. I'm passionate about technology and I'm always looking for new challenges.",
    pt: 'Ola, sou Leonardo Mello, tenho 20 anos e estou cursando Engenharia de Software na FIAP. Atualmente, atuo como estagiario na Ticket, integrando o time de Canais Digitais como Desenvolvedor. Sou apaixonado por tecnologia e estou sempre em busca de novos desafios.',
  },
  photo: {
    src: fotoeu,
    alt: 'Foto de Leonardo Mello',
  },
};

export const socialLinks = {
  github: 'https://github.com/leocorreamello',
  linkedin: 'https://www.linkedin.com/in/leocorreamello/',
};

export const resumeData = {
  file: cvFile,
  label: {
    en: 'Download CV',
    pt: 'Baixar Curriculo',
  },
};

export const contactIcons = {
  github: githubIcon,
  linkedin: linkedinIcon,
  resume: curriculoIcon,
};

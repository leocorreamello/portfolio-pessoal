import {
  SiArduino,
  SiBootstrap,
  SiCss,
  SiCplusplus,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiOpenjdk,
  SiReact,
  SiSass,
  SiTailwindcss,
} from 'react-icons/si';

const technologyIconMap = {
  html: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#1572B6' },
  js: { Icon: SiJavascript, color: '#F7DF1E' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  react: { Icon: SiReact, color: '#61DAFB' },
  bootstrap: { Icon: SiBootstrap, color: '#7952B3' },
  java: { Icon: SiOpenjdk, color: '#EA2D2E' },
  git: { Icon: SiGit, color: '#F05032' },
  sass: { Icon: SiSass, color: '#CC6699' },
  arduino: { Icon: SiArduino, color: '#00979D' },
  cpp: { Icon: SiCplusplus, color: '#00599C' },
  tailwind: { Icon: SiTailwindcss, color: '#06B6D4' },
};

export const getTechnologyIcon = (id) => {
  if (!id) return null;
  return technologyIconMap[id.toLowerCase()] || null;
};

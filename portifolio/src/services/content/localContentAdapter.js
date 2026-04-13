export const localPortfolioContent = {
  profile: {
    name: '',
    greeting: { en: '', pt: '' },
    role: { en: '', pt: '' },
    about: { en: '', pt: '' },
    photo: { src: '', alt: '' },
  },
  socialLinks: {
    github: '',
    linkedin: '',
  },
  resume: {
    file: '',
    label: { en: '', pt: '' },
  },
  contactIcons: {
    github: '',
    linkedin: '',
    resume: '',
  },
  technologies: [],
  projectTechnologies: [],
  projects: [],
  timeline: [],
  certificates: [],
  socialImpact: [],
};

export const localContentAdapter = {
  async getContent() {
    return localPortfolioContent;
  },
};

import { contactIcons, profileData, resumeData, socialLinks } from '../../data/profileData';
import { projects, technologies } from '../../data/projectsData';

export const localPortfolioContent = {
  profile: profileData,
  socialLinks,
  resume: resumeData,
  contactIcons,
  technologies,
  projects,
};

export const localContentAdapter = {
  async getContent() {
    return localPortfolioContent;
  },
};

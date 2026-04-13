const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const ensureLocalizedText = (value, fallback, path, errors) => {
  const safeValue = isObject(value) ? value : fallback;

  const en = isNonEmptyString(safeValue.en) ? safeValue.en : fallback.en;
  const pt = isNonEmptyString(safeValue.pt) ? safeValue.pt : fallback.pt;

  if (!isObject(value)) {
    errors.push(`${path} must be an object with en/pt`);
  }

  return { en, pt };
};

const ensureProfile = (profile, fallback, errors) => {
  const safeProfile = isObject(profile) ? profile : {};

  if (!isObject(profile)) {
    errors.push('profile must be an object');
  }

  return {
    name: isNonEmptyString(safeProfile.name) ? safeProfile.name : fallback.name,
    greeting: ensureLocalizedText(safeProfile.greeting, fallback.greeting, 'profile.greeting', errors),
    role: ensureLocalizedText(safeProfile.role, fallback.role, 'profile.role', errors),
    about: ensureLocalizedText(safeProfile.about, fallback.about, 'profile.about', errors),
    photo: {
      src: isNonEmptyString(safeProfile.photo?.src) ? safeProfile.photo.src : fallback.photo.src,
      alt: isNonEmptyString(safeProfile.photo?.alt) ? safeProfile.photo.alt : fallback.photo.alt,
    },
  };
};

const ensureSocialLinks = (socialLinks, fallback, errors) => {
  const safeSocialLinks = isObject(socialLinks) ? socialLinks : {};

  if (!isObject(socialLinks)) {
    errors.push('socialLinks must be an object');
  }

  return {
    github: isNonEmptyString(safeSocialLinks.github) ? safeSocialLinks.github : fallback.github,
    linkedin: isNonEmptyString(safeSocialLinks.linkedin) ? safeSocialLinks.linkedin : fallback.linkedin,
  };
};

const ensureResume = (resume, fallback, errors) => {
  const safeResume = isObject(resume) ? resume : {};

  if (!isObject(resume)) {
    errors.push('resume must be an object');
  }

  return {
    file: isNonEmptyString(safeResume.file) ? safeResume.file : fallback.file,
    label: ensureLocalizedText(safeResume.label, fallback.label, 'resume.label', errors),
  };
};

const ensureContactIcons = (icons, fallback, errors) => {
  const safeIcons = isObject(icons) ? icons : {};

  if (!isObject(icons)) {
    errors.push('contactIcons must be an object');
  }

  return {
    github: isNonEmptyString(safeIcons.github) ? safeIcons.github : fallback.github,
    linkedin: isNonEmptyString(safeIcons.linkedin) ? safeIcons.linkedin : fallback.linkedin,
    resume: isNonEmptyString(safeIcons.resume) ? safeIcons.resume : fallback.resume,
  };
};

const ensureTechnologies = (technologies, fallback, errors) => {
  if (!Array.isArray(technologies)) {
    errors.push('technologies must be an array');
    return fallback;
  }

  const sanitized = technologies.filter((tech) => isNonEmptyString(tech?.id) && isNonEmptyString(tech?.name) && isNonEmptyString(tech?.icon));

  if (sanitized.length !== technologies.length) {
    errors.push('technologies has invalid items');
  }

  return sanitized.length > 0 ? sanitized : fallback;
};

const ensureProjects = (projects, fallback, errors) => {
  if (!Array.isArray(projects)) {
    errors.push('projects must be an array');
    return fallback;
  }

  const sanitized = projects
    .filter((project) => {
      const hasBaseData =
        isNonEmptyString(project?.id) &&
        isNonEmptyString(project?.title) &&
        isNonEmptyString(project?.image) &&
        isNonEmptyString(project?.codeUrl) &&
        isNonEmptyString(project?.liveUrl) &&
        Array.isArray(project?.techIds);

      return hasBaseData;
    })
    .map((project) => ({
      ...project,
      techIds: project.techIds.filter((id) => isNonEmptyString(id)),
    }));

  if (sanitized.length !== projects.length) {
    errors.push('projects has invalid items');
  }

  return sanitized.length > 0 ? sanitized : fallback;
};

const ensureTimeline = (timeline, fallback, errors) => {
  if (!Array.isArray(timeline)) {
    errors.push('timeline must be an array');
    return fallback;
  }

  const sanitized = timeline
    .filter((item) => {
      const hasBaseData =
        isNonEmptyString(item?.id) &&
        isNonEmptyString(item?.type) &&
        isNonEmptyString(item?.title) &&
        isNonEmptyString(item?.organization) &&
        isNonEmptyString(item?.period) &&
        isObject(item?.description);

      return hasBaseData;
    })
    .map((item) => ({
      ...item,
      description: ensureLocalizedText(item.description, { en: '', pt: '' }, 'timeline.description', errors),
      location: isNonEmptyString(item?.location) ? item.location : '',
    }));

  if (sanitized.length !== timeline.length) {
    errors.push('timeline has invalid items');
  }

  return sanitized.length > 0 ? sanitized : fallback;
};

const ensureCertificates = (certificates, fallback, errors) => {
  if (!Array.isArray(certificates)) {
    errors.push('certificates must be an array');
    return fallback;
  }

  const sanitized = certificates
    .filter((item) => {
      const hasBaseData =
        isNonEmptyString(item?.id) &&
        isNonEmptyString(item?.title) &&
        isNonEmptyString(item?.issuer) &&
        isNonEmptyString(item?.date) &&
        isNonEmptyString(item?.image);

      return hasBaseData;
    })
    .map((item) => ({
      ...item,
      credentialUrl: isNonEmptyString(item?.credentialUrl) ? item.credentialUrl : '',
      description: isObject(item?.description)
        ? ensureLocalizedText(item.description, { en: '', pt: '' }, 'certificates.description', errors)
        : { en: '', pt: '' },
    }));

  if (sanitized.length !== certificates.length) {
    errors.push('certificates has invalid items');
  }

  return sanitized.length > 0 ? sanitized : fallback;
};

const ensureSocialImpact = (socialImpact, fallback, errors) => {
  if (!Array.isArray(socialImpact)) {
    errors.push('socialImpact must be an array');
    return fallback;
  }

  const sanitized = socialImpact
    .filter((item) => {
      const hasBaseData =
        isNonEmptyString(item?.id) &&
        isNonEmptyString(item?.title) &&
        isNonEmptyString(item?.period) &&
        isNonEmptyString(item?.image) &&
        isObject(item?.description);

      return hasBaseData;
    })
    .map((item) => ({
      ...item,
      description: ensureLocalizedText(item.description, { en: '', pt: '' }, 'socialImpact.description', errors),
      impact: isNonEmptyString(item?.impact) ? item.impact : '',
    }));

  if (sanitized.length !== socialImpact.length) {
    errors.push('socialImpact has invalid items');
  }

  return sanitized.length > 0 ? sanitized : fallback;
};

export const validatePortfolioContent = (content, fallbackContent) => {
  const errors = [];
  const safeContent = isObject(content) ? content : {};

  if (!isObject(content)) {
    errors.push('root content must be an object');
  }

  const validatedContent = {
    profile: ensureProfile(safeContent.profile, fallbackContent.profile, errors),
    socialLinks: ensureSocialLinks(safeContent.socialLinks, fallbackContent.socialLinks, errors),
    resume: ensureResume(safeContent.resume, fallbackContent.resume, errors),
    contactIcons: ensureContactIcons(safeContent.contactIcons, fallbackContent.contactIcons, errors),
    technologies: ensureTechnologies(safeContent.technologies, fallbackContent.technologies, errors),
    projects: ensureProjects(safeContent.projects, fallbackContent.projects, errors),
    timeline: ensureTimeline(safeContent.timeline, fallbackContent.timeline, errors),
    certificates: ensureCertificates(safeContent.certificates, fallbackContent.certificates, errors),
    socialImpact: ensureSocialImpact(safeContent.socialImpact, fallbackContent.socialImpact, errors),
  };

  return {
    content: validatedContent,
    errors,
    isValid: errors.length === 0,
  };
};

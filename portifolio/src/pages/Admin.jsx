import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ProtectedAdminRoute from '../components/admin/ProtectedAdminRoute';
import { getContentSource, getPortfolioContent, removeProject, saveContent, saveProject, saveResume, uploadPortfolioAssetFile, uploadResumeFile } from '../services/content/contentService';
import { signOutAdmin } from '../services/auth/adminAuthService';
import { usePortfolioContent } from '../hooks/usePortfolioContent';

const createProjectId = (title) => {
  const slug = (title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return slug || `project-${Date.now()}`;
};

const splitTechIds = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const languageModes = [
  { id: 'both', label: 'Both' },
  { id: 'en', label: 'EN' },
  { id: 'pt', label: 'PT' },
];

const languageTone = {
  en: 'border-cyan-400/35 bg-cyan-400/10 text-cyan-100',
  pt: 'border-fuchsia-400/35 bg-fuchsia-400/10 text-fuchsia-100',
};

function LocalizedFieldGroup({
  label,
  languageView,
  enValue,
  ptValue,
  onChangeEn,
  onChangePt,
  multiline = false,
  className = '',
  placeholderEn,
  placeholderPt,
}) {
  const languages = languageView === 'both' ? ['en', 'pt'] : [languageView];
  const commonClassName = `w-full px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted ${multiline ? 'min-h-24' : ''}`;

  return (
    <div className={`grid grid-cols-1 ${languageView === 'both' ? 'md:grid-cols-2' : ''} gap-3 ${className}`}>
      {languages.map((language) => {
        const value = language === 'en' ? enValue : ptValue;
        const onChange = language === 'en' ? onChangeEn : onChangePt;
        const placeholder = language === 'en' ? placeholderEn || `${label} EN` : placeholderPt || `${label} PT`;

        return (
          <label key={language} className='space-y-2'>
            <div className='flex items-center justify-between gap-3'>
              <span className='text-sm text-textMuted'>{label}</span>
              <span className={`px-2 py-1 rounded-full border text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${languageTone[language]}`}>
                {language}
              </span>
            </div>
            {multiline ? (
              <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={commonClassName}
              />
            ) : (
              <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={commonClassName}
              />
            )}
          </label>
        );
      })}
    </div>
  );
}

LocalizedFieldGroup.propTypes = {
  label: PropTypes.string.isRequired,
  languageView: PropTypes.oneOf(['both', 'en', 'pt']).isRequired,
  enValue: PropTypes.string.isRequired,
  ptValue: PropTypes.string.isRequired,
  onChangeEn: PropTypes.func.isRequired,
  onChangePt: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  className: PropTypes.string,
  placeholderEn: PropTypes.string,
  placeholderPt: PropTypes.string,
};

export default function Admin() {
  const { content, isLoading } = usePortfolioContent();
  const [draftContent, setDraftContent] = useState(content);
  const [projects, setProjects] = useState(content.projects);
  const [resume, setResume] = useState(content.resume);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [languageView, setLanguageView] = useState('both');
  const [newProject, setNewProject] = useState({
    title: '',
    image: '',
    techIds: '',
    codeUrl: '',
    liveUrl: '',
  });
  const [newTechnology, setNewTechnology] = useState({
    id: '',
    name: '',
    icon: '',
  });
  const [newProjectTechnology, setNewProjectTechnology] = useState({
    id: '',
    name: '',
    icon: '',
  });
  const [newTimeline, setNewTimeline] = useState({
    id: '',
    type: 'Experience',
    title: '',
    organization: '',
    period: '',
    location: '',
    descriptionEn: '',
    descriptionPt: '',
  });
  const [newCertificate, setNewCertificate] = useState({
    id: '',
    title: '',
    issuer: '',
    date: '',
    image: '',
    credentialUrl: '',
    descriptionEn: '',
    descriptionPt: '',
  });
  const [newSocialImpact, setNewSocialImpact] = useState({
    id: '',
    title: '',
    period: '',
    impact: '',
    image: '',
    descriptionEn: '',
    descriptionPt: '',
  });

  const hasProfileChanges = useMemo(
    () => JSON.stringify({ profile: draftContent.profile, socialLinks: draftContent.socialLinks }) !== JSON.stringify({ profile: content.profile, socialLinks: content.socialLinks }),
    [draftContent.profile, draftContent.socialLinks, content.profile, content.socialLinks]
  );

  const hasTechnologyChanges = useMemo(
    () => JSON.stringify(draftContent.technologies) !== JSON.stringify(content.technologies),
    [draftContent.technologies, content.technologies]
  );

  const hasProjectTechnologyChanges = useMemo(
    () => JSON.stringify(draftContent.projectTechnologies || []) !== JSON.stringify(content.projectTechnologies || []),
    [draftContent.projectTechnologies, content.projectTechnologies]
  );

  const hasProjectChanges = useMemo(
    () => JSON.stringify(projects) !== JSON.stringify(content.projects),
    [projects, content.projects]
  );

  const hasResumeChanges = useMemo(
    () => JSON.stringify(resume) !== JSON.stringify(content.resume),
    [resume, content.resume]
  );

  const hasTimelineChanges = useMemo(
    () => JSON.stringify(draftContent.timeline) !== JSON.stringify(content.timeline),
    [draftContent.timeline, content.timeline]
  );

  const hasCertificateChanges = useMemo(
    () => JSON.stringify(draftContent.certificates) !== JSON.stringify(content.certificates),
    [draftContent.certificates, content.certificates]
  );

  const hasSocialImpactChanges = useMemo(
    () => JSON.stringify(draftContent.socialImpact) !== JSON.stringify(content.socialImpact),
    [draftContent.socialImpact, content.socialImpact]
  );

  const pendingChanges = hasProfileChanges || hasTechnologyChanges || hasProjectTechnologyChanges || hasProjectChanges || hasResumeChanges || hasTimelineChanges || hasCertificateChanges || hasSocialImpactChanges;

  const isEditable = useMemo(() => getContentSource() === 'supabase', []);

  useEffect(() => {
    if (!isLoading) {
      setDraftContent(content);
      setProjects(content.projects);
      setResume(content.resume);
    }
  }, [content, isLoading]);

  const updateDraftField = (path, value) => {
    setDraftContent((previous) => {
      const next = structuredClone(previous);
      const segments = path.split('.');
      let cursor = next;

      for (let index = 0; index < segments.length - 1; index += 1) {
        cursor = cursor[segments[index]];
      }

      cursor[segments[segments.length - 1]] = value;
      return next;
    });
  };

  const updateTechnologyField = (id, field, value) => {
    setDraftContent((previous) => ({
      ...previous,
      technologies: previous.technologies.map((technology) =>
        technology.id === id ? { ...technology, [field]: value } : technology
      ),
    }));
  };

  const updateProjectTechnologyField = (id, field, value) => {
    setDraftContent((previous) => ({
      ...previous,
      projectTechnologies: (previous.projectTechnologies || []).map((technology) =>
        technology.id === id ? { ...technology, [field]: value } : technology
      ),
    }));
  };

  const handleContentSave = async (contentToSave = draftContent) => {
    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    try {
      const updatedContent = await saveContent(contentToSave);
      setDraftContent(updatedContent);
      setStatusMessage('Content saved successfully.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to save content.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateProjectField = (id, field, value) => {
    setProjects((previous) =>
      previous.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    );
  };

  const handleProjectSave = async (project) => {
    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    try {
      const sanitizedProject = {
        ...project,
        id: project.id || createProjectId(project.title),
        techIds: Array.isArray(project.techIds) ? project.techIds : splitTechIds(project.techIds || ''),
      };

      const updatedContent = await saveProject(sanitizedProject);
      setProjects(updatedContent.projects);
      setDraftContent(updatedContent);
      setStatusMessage('Project saved successfully.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProjectDelete = async (projectId) => {
    const shouldDelete = window.confirm('Delete this project? This action cannot be undone.');
    if (!shouldDelete) return;

    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    try {
      const updatedContent = await removeProject(projectId);
      setProjects(updatedContent.projects);
      setDraftContent(updatedContent);
      setStatusMessage('Project removed successfully.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to remove project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewProjectCreate = async () => {
    await handleProjectSave({
      id: createProjectId(newProject.title),
      title: newProject.title,
      image: newProject.image,
      techIds: splitTechIds(newProject.techIds),
      codeUrl: newProject.codeUrl,
      liveUrl: newProject.liveUrl,
    });

    setNewProject({ title: '', image: '', techIds: '', codeUrl: '', liveUrl: '' });
  };

  const handleResumeSave = async () => {
    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    try {
      const updatedContent = await saveResume(resume);
      setResume(updatedContent.resume);
      setStatusMessage('Resume updated successfully.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to save resume.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    try {
      const publicUrl = await uploadResumeFile(file);
      setResume((previous) => ({ ...previous, file: publicUrl }));
      setStatusMessage('Resume uploaded. Click save to persist the URL in content.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to upload resume.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAssetUpload = async (event, folder, applyUrl) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    try {
      const publicUrl = await uploadPortfolioAssetFile(file, folder);
      applyUrl(publicUrl);
      setStatusMessage('Asset uploaded. Save the section to persist the URL.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to upload asset.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTechnologyCreate = () => {
    if (!newTechnology.id || !newTechnology.name || !newTechnology.icon) {
      setErrorMessage('Fill technology id, name and icon URL before adding.');
      return;
    }

    setDraftContent((previous) => ({
      ...previous,
      technologies: [
        ...previous.technologies,
        {
          id: newTechnology.id,
          name: newTechnology.name,
          icon: newTechnology.icon,
        },
      ],
    }));

    setNewTechnology({ id: '', name: '', icon: '' });
    setStatusMessage('Technology added to draft. Save content to persist changes.');
  };

  const handleTechnologyDelete = (technologyId) => {
    const shouldDelete = window.confirm('Remove this technology? This action cannot be undone.');
    if (!shouldDelete) return;

    setDraftContent((previous) => ({
      ...previous,
      technologies: previous.technologies.filter((technology) => technology.id !== technologyId),
    }));

    setStatusMessage('Technology removed from draft. Save content to persist changes.');
  };

  const handleProjectTechnologyCreate = () => {
    if (!newProjectTechnology.id || !newProjectTechnology.name || !newProjectTechnology.icon) {
      setErrorMessage('Fill project technology id, name and icon URL before adding.');
      return;
    }

    setDraftContent((previous) => ({
      ...previous,
      projectTechnologies: [
        ...(previous.projectTechnologies || []),
        {
          id: newProjectTechnology.id,
          name: newProjectTechnology.name,
          icon: newProjectTechnology.icon,
        },
      ],
    }));

    setNewProjectTechnology({ id: '', name: '', icon: '' });
    setStatusMessage('Project technology added to draft. Save content to persist changes.');
  };

  const handleProjectTechnologyDelete = (technologyId) => {
    const shouldDelete = window.confirm('Remove this project technology? This action cannot be undone.');
    if (!shouldDelete) return;

    setDraftContent((previous) => ({
      ...previous,
      projectTechnologies: (previous.projectTechnologies || []).filter((technology) => technology.id !== technologyId),
    }));

    setStatusMessage('Project technology removed from draft. Save content to persist changes.');
  };

  const handleDraftArrayCreate = async (section, item, successMessage) => {
    const nextContent = structuredClone(draftContent);
    nextContent[section] = [...(nextContent[section] || []), item];
    await handleContentSave(nextContent);
    setStatusMessage(successMessage);
  };

  const handleDraftArrayDelete = async (section, itemId, confirmLabel, successMessage) => {
    const shouldDelete = window.confirm(confirmLabel);
    if (!shouldDelete) return;

    const nextContent = structuredClone(draftContent);
    nextContent[section] = (nextContent[section] || []).filter((item) => item.id !== itemId);
    await handleContentSave(nextContent);
    setStatusMessage(successMessage);
  };

  const updateArrayDraftField = (section, itemId, fieldPath, value) => {
    setDraftContent((previous) => {
      const next = structuredClone(previous);
      next[section] = (next[section] || []).map((item) => {
        if (item.id !== itemId) return item;

        if (fieldPath.includes('.')) {
          const updatedItem = structuredClone(item);
          const segments = fieldPath.split('.');
          let cursor = updatedItem;

          for (let index = 0; index < segments.length - 1; index += 1) {
            cursor = cursor[segments[index]];
          }

          cursor[segments[segments.length - 1]] = value;
          return updatedItem;
        }

        return { ...item, [fieldPath]: value };
      });

      return next;
    });
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    window.location.reload();
  };

  const downloadBackup = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      source: getContentSource(),
      content: draftContent,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatusMessage('Backup JSON downloaded successfully.');
  };

  const handleRefreshFromSource = async () => {
    const shouldRefresh = window.confirm('Reload content from the current source and discard unsaved changes?');
    if (!shouldRefresh) return;

    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    try {
      const freshContent = await getPortfolioContent();
      setDraftContent(freshContent);
      setProjects(freshContent.projects);
      setResume(freshContent.resume);
      setStatusMessage('Content reloaded from source.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to reload content.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedAdminRoute isEnglish={true}>
      <main className='min-h-screen px-4 sm:px-6 md:px-10 py-8 sm:py-12 bg-background text-textMain'>
        <div className='max-w-7xl mx-auto space-y-8'>
          <header className='flex flex-wrap items-center justify-between gap-4'>
            <div>
              <h1 className='text-3xl sm:text-4xl font-semibold'>Portfolio Admin</h1>
              <p className='text-gray-300 mt-2'>
                Owner-only editing for profile, links, technologies, projects and resume.
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <button
                type='button'
                onClick={downloadBackup}
                className='px-4 py-2 rounded-lg bg-surface border border-surfaceMuted hover:bg-surfaceMuted'
              >
                Download backup
              </button>
              <button
                type='button'
                onClick={handleRefreshFromSource}
                disabled={isSaving}
                className='px-4 py-2 rounded-lg bg-surface border border-surfaceMuted hover:bg-surfaceMuted disabled:opacity-50'
              >
                Reload source
              </button>
              <button
                onClick={handleSignOut}
                className='px-4 py-2 rounded-lg bg-surface border border-surfaceMuted hover:bg-surfaceMuted'
                type='button'
              >
                Sign out
              </button>
            </div>
          </header>

          <nav className='flex flex-wrap gap-3'>
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'technologies', label: 'Bio technologies' },
              { id: 'project-technologies', label: 'Project technologies' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'certificates', label: 'Certificates' },
              { id: 'social-impact', label: 'Social impact' },
              { id: 'projects', label: 'Projects' },
              { id: 'resume', label: 'Resume' },
            ].map((item) => (
              <button
                key={item.id}
                type='button'
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-full border ${activeSection === item.id ? 'bg-gradient-to-r from-accentStart to-accentEnd text-black border-transparent' : 'bg-surface border-surfaceMuted text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <section className='p-4 rounded-xl bg-surface border border-surfaceMuted flex flex-wrap items-center justify-between gap-3'>
            <div>
              <p className='text-sm uppercase tracking-[0.25em] text-textMuted'>Language view</p>
              <p className='text-sm text-textMuted mt-1'>Switch between bilingual fields or edit one language at a time.</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {languageModes.map((mode) => (
                <button
                  key={mode.id}
                  type='button'
                  onClick={() => setLanguageView(mode.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium ${languageView === mode.id ? 'bg-gradient-to-r from-accentStart to-accentEnd text-black border-transparent' : 'bg-[#111418] border-surfaceMuted text-textMuted'}`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </section>

          {!isEditable ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted'>
              <p className='text-yellow-300'>
                Editing is disabled because content source is not set to Supabase. Set `VITE_CONTENT_SOURCE=supabase`.
              </p>
            </section>
          ) : null}

          {statusMessage ? <p className='text-green-300'>{statusMessage}</p> : null}
          {errorMessage ? <p className='text-red-300'>{errorMessage}</p> : null}

          {pendingChanges ? (
            <section className='p-4 rounded-xl border border-yellow-500/60 bg-yellow-500/10 text-yellow-100'>
              You have unsaved changes.
            </section>
          ) : null}

          {activeSection === 'profile' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-2xl font-semibold'>Profile & Links</h2>
                <button
                  type='button'
                  onClick={() => handleContentSave()}
                  disabled={isSaving || !isEditable}
                  className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold disabled:opacity-50'
                >
                  Save Profile
                </button>
              </div>

              <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <input value={draftContent.profile.name} onChange={(event) => updateDraftField('profile.name', event.target.value)} placeholder='Name' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                  <input value={draftContent.profile.photo.src} onChange={(event) => updateDraftField('profile.photo.src', event.target.value)} placeholder='Profile photo URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(event) => handleAssetUpload(event, 'profile', (publicUrl) => updateDraftField('profile.photo.src', publicUrl))}
                    className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-2'
                  />
                  <input value={draftContent.profile.photo.alt} onChange={(event) => updateDraftField('profile.photo.alt', event.target.value)} placeholder='Profile photo alt text' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-2' />
                  <LocalizedFieldGroup
                    label='Greeting'
                    languageView={languageView}
                    enValue={draftContent.profile.greeting.en}
                    ptValue={draftContent.profile.greeting.pt}
                    onChangeEn={(event) => updateDraftField('profile.greeting.en', event.target.value)}
                    onChangePt={(event) => updateDraftField('profile.greeting.pt', event.target.value)}
                    className='lg:col-span-2'
                  />
                  <LocalizedFieldGroup
                    label='Role'
                    languageView={languageView}
                    enValue={draftContent.profile.role.en}
                    ptValue={draftContent.profile.role.pt}
                    onChangeEn={(event) => updateDraftField('profile.role.en', event.target.value)}
                    onChangePt={(event) => updateDraftField('profile.role.pt', event.target.value)}
                    className='lg:col-span-2'
                  />
                  <LocalizedFieldGroup
                    label='About'
                    languageView={languageView}
                    enValue={draftContent.profile.about.en}
                    ptValue={draftContent.profile.about.pt}
                    onChangeEn={(event) => updateDraftField('profile.about.en', event.target.value)}
                    onChangePt={(event) => updateDraftField('profile.about.pt', event.target.value)}
                    multiline
                    className='lg:col-span-2'
                  />
                  <input value={draftContent.socialLinks.github} onChange={(event) => updateDraftField('socialLinks.github', event.target.value)} placeholder='GitHub URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                  <input value={draftContent.socialLinks.linkedin} onChange={(event) => updateDraftField('socialLinks.linkedin', event.target.value)} placeholder='LinkedIn URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                </div>

                <div className='bg-[#111418] rounded-2xl border border-surfaceMuted p-4 space-y-4'>
                  <h3 className='text-xl font-semibold'>Live Preview</h3>
                  <div className='space-y-3'>
                    <img src={draftContent.profile.photo.src} alt={draftContent.profile.photo.alt} className='w-36 h-36 rounded-full object-cover border border-surfaceMuted' />
                    <div>
                      <p className='text-sm text-gray-300'>{draftContent.profile.greeting.en} / {draftContent.profile.greeting.pt}</p>
                      <h4 className='text-2xl font-semibold'>{draftContent.profile.name}</h4>
                      <p className='text-lg text-gray-200'>{draftContent.profile.role.en}</p>
                    </div>
                    <p className='text-sm text-gray-300 max-h-32 overflow-hidden'>{draftContent.profile.about.en}</p>
                    <div className='flex gap-3'>
                      <span className='px-3 py-1 rounded-full bg-surfaceMuted text-sm'>GitHub</span>
                      <span className='px-3 py-1 rounded-full bg-surfaceMuted text-sm'>LinkedIn</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeSection === 'technologies' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-2xl font-semibold'>Bio technologies</h2>
                <button
                  type='button'
                  onClick={() => handleContentSave()}
                  disabled={isSaving || !isEditable}
                  className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold disabled:opacity-50'
                >
                  Save Technologies
                </button>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                <input value={newTechnology.id} onChange={(event) => setNewTechnology((prev) => ({ ...prev, id: event.target.value }))} placeholder='Tech ID' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newTechnology.name} onChange={(event) => setNewTechnology((prev) => ({ ...prev, name: event.target.value }))} placeholder='Tech name' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newTechnology.icon} onChange={(event) => setNewTechnology((prev) => ({ ...prev, icon: event.target.value }))} placeholder='Icon URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input
                  type='file'
                  accept='image/*'
                  onChange={(event) => handleAssetUpload(event, 'technologies', (publicUrl) => setNewTechnology((previous) => ({ ...previous, icon: publicUrl })))}
                  className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-3'
                />
              </div>

              <button type='button' onClick={handleTechnologyCreate} className='px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500'>
                Add Technology
              </button>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {draftContent.technologies.map((technology) => (
                  <article key={technology.id} className='p-4 rounded-lg border border-surfaceMuted bg-[#111418] space-y-3'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                      <input value={technology.id} onChange={(event) => updateTechnologyField(technology.id, 'id', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={technology.name} onChange={(event) => updateTechnologyField(technology.id, 'name', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={technology.icon} onChange={(event) => updateTechnologyField(technology.id, 'icon', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(event) => handleAssetUpload(event, 'technologies', (publicUrl) => updateTechnologyField(technology.id, 'icon', publicUrl))}
                        className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted md:col-span-3'
                      />
                    </div>
                    <div className='flex gap-3'>
                      <button type='button' onClick={() => handleTechnologyDelete(technology.id)} className='px-3 py-2 rounded-lg bg-red-700 hover:bg-red-600'>
                        Remove
                      </button>
                      <img src={technology.icon} alt={technology.name} className='w-10 h-10 object-contain' />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeSection === 'project-technologies' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-2xl font-semibold'>Project technologies</h2>
                <button
                  type='button'
                  onClick={() => handleContentSave()}
                  disabled={isSaving || !isEditable}
                  className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold disabled:opacity-50'
                >
                  Save Project Technologies
                </button>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                <input value={newProjectTechnology.id} onChange={(event) => setNewProjectTechnology((prev) => ({ ...prev, id: event.target.value }))} placeholder='Tech ID' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newProjectTechnology.name} onChange={(event) => setNewProjectTechnology((prev) => ({ ...prev, name: event.target.value }))} placeholder='Tech name' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newProjectTechnology.icon} onChange={(event) => setNewProjectTechnology((prev) => ({ ...prev, icon: event.target.value }))} placeholder='Icon URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input
                  type='file'
                  accept='image/*'
                  onChange={(event) => handleAssetUpload(event, 'project-technologies', (publicUrl) => setNewProjectTechnology((previous) => ({ ...previous, icon: publicUrl })))}
                  className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-3'
                />
              </div>

              <button type='button' onClick={handleProjectTechnologyCreate} className='px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500'>
                Add Project Technology
              </button>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {(draftContent.projectTechnologies || []).map((technology) => (
                  <article key={technology.id} className='p-4 rounded-lg border border-surfaceMuted bg-[#111418] space-y-3'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                      <input value={technology.id} onChange={(event) => updateProjectTechnologyField(technology.id, 'id', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={technology.name} onChange={(event) => updateProjectTechnologyField(technology.id, 'name', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={technology.icon} onChange={(event) => updateProjectTechnologyField(technology.id, 'icon', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(event) => handleAssetUpload(event, 'project-technologies', (publicUrl) => updateProjectTechnologyField(technology.id, 'icon', publicUrl))}
                        className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted md:col-span-3'
                      />
                    </div>
                    <div className='flex gap-3'>
                      <button type='button' onClick={() => handleProjectTechnologyDelete(technology.id)} className='px-3 py-2 rounded-lg bg-red-700 hover:bg-red-600'>
                        Remove
                      </button>
                      <img src={technology.icon} alt={technology.name} className='w-10 h-10 object-contain' />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeSection === 'timeline' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-2xl font-semibold'>Timeline</h2>
                <button
                  type='button'
                  onClick={() => handleContentSave()}
                  disabled={isSaving || !isEditable}
                  className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold disabled:opacity-50'
                >
                  Save Timeline
                </button>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                <input value={newTimeline.type} onChange={(event) => setNewTimeline((prev) => ({ ...prev, type: event.target.value }))} placeholder='Type' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newTimeline.title} onChange={(event) => setNewTimeline((prev) => ({ ...prev, title: event.target.value }))} placeholder='Title' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newTimeline.organization} onChange={(event) => setNewTimeline((prev) => ({ ...prev, organization: event.target.value }))} placeholder='Organization' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newTimeline.period} onChange={(event) => setNewTimeline((prev) => ({ ...prev, period: event.target.value }))} placeholder='Period' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newTimeline.location} onChange={(event) => setNewTimeline((prev) => ({ ...prev, location: event.target.value }))} placeholder='Location' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newTimeline.id} onChange={(event) => setNewTimeline((prev) => ({ ...prev, id: event.target.value }))} placeholder='Item ID (optional)' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <LocalizedFieldGroup
                  label='Description'
                  languageView={languageView}
                  enValue={newTimeline.descriptionEn}
                  ptValue={newTimeline.descriptionPt}
                  onChangeEn={(event) => setNewTimeline((prev) => ({ ...prev, descriptionEn: event.target.value }))}
                  onChangePt={(event) => setNewTimeline((prev) => ({ ...prev, descriptionPt: event.target.value }))}
                  multiline
                  className='lg:col-span-2'
                />
              </div>

              <button
                type='button'
                disabled={isSaving || !isEditable}
                onClick={async () => {
                  if (!newTimeline.title || !newTimeline.organization || !newTimeline.period || !newTimeline.descriptionEn || !newTimeline.descriptionPt) {
                    setErrorMessage('Fill timeline title, organization, period and descriptions before adding.');
                    return;
                  }

                  await handleDraftArrayCreate('timeline', {
                    id: newTimeline.id || createProjectId(newTimeline.title),
                    type: newTimeline.type,
                    title: newTimeline.title,
                    organization: newTimeline.organization,
                    period: newTimeline.period,
                    location: newTimeline.location,
                    description: { en: newTimeline.descriptionEn, pt: newTimeline.descriptionPt },
                  }, 'Timeline item saved.');

                  setNewTimeline({ id: '', type: 'Experience', title: '', organization: '', period: '', location: '', descriptionEn: '', descriptionPt: '' });
                }}
                className='px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500'
              >
                Add Timeline Item
              </button>

              <div className='space-y-4'>
                {draftContent.timeline.map((item) => (
                  <article key={item.id} className='p-4 rounded-lg border border-surfaceMuted bg-[#111418] space-y-3'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                      <input value={item.type} onChange={(event) => updateArrayDraftField('timeline', item.id, 'type', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.title} onChange={(event) => updateArrayDraftField('timeline', item.id, 'title', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.organization} onChange={(event) => updateArrayDraftField('timeline', item.id, 'organization', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.period} onChange={(event) => updateArrayDraftField('timeline', item.id, 'period', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.location || ''} onChange={(event) => updateArrayDraftField('timeline', item.id, 'location', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.id} onChange={(event) => updateArrayDraftField('timeline', item.id, 'id', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <LocalizedFieldGroup
                        label='Description'
                        languageView={languageView}
                        enValue={item.description?.en || ''}
                        ptValue={item.description?.pt || ''}
                        onChangeEn={(event) => updateArrayDraftField('timeline', item.id, 'description.en', event.target.value)}
                        onChangePt={(event) => updateArrayDraftField('timeline', item.id, 'description.pt', event.target.value)}
                        multiline
                        className='md:col-span-2'
                      />
                    </div>
                    <div className='flex gap-3'>
                      <button type='button' onClick={() => handleDraftArrayDelete('timeline', item.id, 'Delete this timeline item?', 'Timeline item removed.')} className='px-3 py-2 rounded-lg bg-red-700 hover:bg-red-600'>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeSection === 'certificates' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-2xl font-semibold'>Certificates</h2>
                <button
                  type='button'
                  onClick={() => handleContentSave()}
                  disabled={isSaving || !isEditable}
                  className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold disabled:opacity-50'
                >
                  Save Certificates
                </button>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                <input value={newCertificate.id} onChange={(event) => setNewCertificate((prev) => ({ ...prev, id: event.target.value }))} placeholder='Certificate ID (optional)' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newCertificate.title} onChange={(event) => setNewCertificate((prev) => ({ ...prev, title: event.target.value }))} placeholder='Title' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newCertificate.issuer} onChange={(event) => setNewCertificate((prev) => ({ ...prev, issuer: event.target.value }))} placeholder='Issuer' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newCertificate.date} onChange={(event) => setNewCertificate((prev) => ({ ...prev, date: event.target.value }))} placeholder='Date' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newCertificate.image} onChange={(event) => setNewCertificate((prev) => ({ ...prev, image: event.target.value }))} placeholder='Image URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input type='file' accept='image/*' onChange={(event) => handleAssetUpload(event, 'certificates', (publicUrl) => setNewCertificate((prev) => ({ ...prev, image: publicUrl })))} className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newCertificate.credentialUrl} onChange={(event) => setNewCertificate((prev) => ({ ...prev, credentialUrl: event.target.value }))} placeholder='Credential URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <LocalizedFieldGroup
                  label='Description'
                  languageView={languageView}
                  enValue={newCertificate.descriptionEn}
                  ptValue={newCertificate.descriptionPt}
                  onChangeEn={(event) => setNewCertificate((prev) => ({ ...prev, descriptionEn: event.target.value }))}
                  onChangePt={(event) => setNewCertificate((prev) => ({ ...prev, descriptionPt: event.target.value }))}
                  multiline
                  className='lg:col-span-2'
                />
              </div>

              <button
                type='button'
                disabled={isSaving || !isEditable}
                onClick={async () => {
                  if (!newCertificate.title || !newCertificate.issuer || !newCertificate.date || !newCertificate.image) {
                    setErrorMessage('Fill certificate title, issuer, date and image before adding.');
                    return;
                  }

                  await handleDraftArrayCreate('certificates', {
                    id: newCertificate.id || createProjectId(newCertificate.title),
                    title: newCertificate.title,
                    issuer: newCertificate.issuer,
                    date: newCertificate.date,
                    image: newCertificate.image,
                    credentialUrl: newCertificate.credentialUrl,
                    description: { en: newCertificate.descriptionEn, pt: newCertificate.descriptionPt },
                  }, 'Certificate saved.');

                  setNewCertificate({ id: '', title: '', issuer: '', date: '', image: '', credentialUrl: '', descriptionEn: '', descriptionPt: '' });
                }}
                className='px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500'
              >
                Add Certificate
              </button>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {draftContent.certificates.map((item) => (
                  <article key={item.id} className='p-4 rounded-lg border border-surfaceMuted bg-[#111418] space-y-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      <input value={item.id} onChange={(event) => updateArrayDraftField('certificates', item.id, 'id', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted md:col-span-2' />
                      <input value={item.title} onChange={(event) => updateArrayDraftField('certificates', item.id, 'title', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.issuer} onChange={(event) => updateArrayDraftField('certificates', item.id, 'issuer', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.date} onChange={(event) => updateArrayDraftField('certificates', item.id, 'date', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.image} onChange={(event) => updateArrayDraftField('certificates', item.id, 'image', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.credentialUrl || ''} onChange={(event) => updateArrayDraftField('certificates', item.id, 'credentialUrl', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted md:col-span-2' />
                      <LocalizedFieldGroup
                        label='Description'
                        languageView={languageView}
                        enValue={item.description?.en || ''}
                        ptValue={item.description?.pt || ''}
                        onChangeEn={(event) => updateArrayDraftField('certificates', item.id, 'description.en', event.target.value)}
                        onChangePt={(event) => updateArrayDraftField('certificates', item.id, 'description.pt', event.target.value)}
                        multiline
                        className='md:col-span-2'
                      />
                    </div>
                    <div className='flex items-center gap-3'>
                      <img src={item.image} alt={item.title} className='w-20 h-14 object-cover rounded-lg border border-surfaceMuted' />
                      <button type='button' onClick={() => handleDraftArrayDelete('certificates', item.id, 'Delete this certificate?', 'Certificate removed.')} className='px-3 py-2 rounded-lg bg-red-700 hover:bg-red-600'>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeSection === 'social-impact' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-2xl font-semibold'>Social impact</h2>
                <button
                  type='button'
                  onClick={() => handleContentSave()}
                  disabled={isSaving || !isEditable}
                  className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold disabled:opacity-50'
                >
                  Save Social Impact
                </button>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                <input value={newSocialImpact.id} onChange={(event) => setNewSocialImpact((prev) => ({ ...prev, id: event.target.value }))} placeholder='Item ID (optional)' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newSocialImpact.title} onChange={(event) => setNewSocialImpact((prev) => ({ ...prev, title: event.target.value }))} placeholder='Title' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newSocialImpact.period} onChange={(event) => setNewSocialImpact((prev) => ({ ...prev, period: event.target.value }))} placeholder='Period' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newSocialImpact.impact} onChange={(event) => setNewSocialImpact((prev) => ({ ...prev, impact: event.target.value }))} placeholder='Impact summary' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newSocialImpact.image} onChange={(event) => setNewSocialImpact((prev) => ({ ...prev, image: event.target.value }))} placeholder='Image URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input type='file' accept='image/*' onChange={(event) => handleAssetUpload(event, 'social-impact', (publicUrl) => setNewSocialImpact((prev) => ({ ...prev, image: publicUrl })))} className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <LocalizedFieldGroup
                  label='Description'
                  languageView={languageView}
                  enValue={newSocialImpact.descriptionEn}
                  ptValue={newSocialImpact.descriptionPt}
                  onChangeEn={(event) => setNewSocialImpact((prev) => ({ ...prev, descriptionEn: event.target.value }))}
                  onChangePt={(event) => setNewSocialImpact((prev) => ({ ...prev, descriptionPt: event.target.value }))}
                  multiline
                  className='lg:col-span-2'
                />
              </div>

              <button
                type='button'
                disabled={isSaving || !isEditable}
                onClick={async () => {
                  if (!newSocialImpact.title || !newSocialImpact.period || !newSocialImpact.image || !newSocialImpact.descriptionEn || !newSocialImpact.descriptionPt) {
                    setErrorMessage('Fill social impact title, period, image and descriptions before adding.');
                    return;
                  }

                  await handleDraftArrayCreate('socialImpact', {
                    id: newSocialImpact.id || createProjectId(newSocialImpact.title),
                    title: newSocialImpact.title,
                    period: newSocialImpact.period,
                    impact: newSocialImpact.impact,
                    image: newSocialImpact.image,
                    description: { en: newSocialImpact.descriptionEn, pt: newSocialImpact.descriptionPt },
                  }, 'Social impact item saved.');

                  setNewSocialImpact({ id: '', title: '', period: '', impact: '', image: '', descriptionEn: '', descriptionPt: '' });
                }}
                className='px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500'
              >
                Add Social Impact Item
              </button>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {draftContent.socialImpact.map((item) => (
                  <article key={item.id} className='p-4 rounded-lg border border-surfaceMuted bg-[#111418] space-y-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      <input value={item.id} onChange={(event) => updateArrayDraftField('socialImpact', item.id, 'id', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted md:col-span-2' />
                      <input value={item.title} onChange={(event) => updateArrayDraftField('socialImpact', item.id, 'title', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.period} onChange={(event) => updateArrayDraftField('socialImpact', item.id, 'period', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={item.impact || ''} onChange={(event) => updateArrayDraftField('socialImpact', item.id, 'impact', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted md:col-span-2' />
                      <input value={item.image} onChange={(event) => updateArrayDraftField('socialImpact', item.id, 'image', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted md:col-span-2' />
                      <LocalizedFieldGroup
                        label='Description'
                        languageView={languageView}
                        enValue={item.description?.en || ''}
                        ptValue={item.description?.pt || ''}
                        onChangeEn={(event) => updateArrayDraftField('socialImpact', item.id, 'description.en', event.target.value)}
                        onChangePt={(event) => updateArrayDraftField('socialImpact', item.id, 'description.pt', event.target.value)}
                        multiline
                        className='md:col-span-2'
                      />
                    </div>
                    <div className='flex items-center gap-3'>
                      <img src={item.image} alt={item.title} className='w-20 h-14 object-cover rounded-lg border border-surfaceMuted' />
                      <button type='button' onClick={() => handleDraftArrayDelete('socialImpact', item.id, 'Delete this social impact item?', 'Social impact item removed.')} className='px-3 py-2 rounded-lg bg-red-700 hover:bg-red-600'>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeSection === 'projects' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <h2 className='text-2xl font-semibold'>Projects</h2>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input value={newProject.title} onChange={(event) => setNewProject((prev) => ({ ...prev, title: event.target.value }))} placeholder='Project title' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newProject.image} onChange={(event) => setNewProject((prev) => ({ ...prev, image: event.target.value }))} placeholder='Image URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input
                  type='file'
                  accept='image/*'
                  onChange={(event) => handleAssetUpload(event, 'projects', (publicUrl) => setNewProject((previous) => ({ ...previous, image: publicUrl })))}
                  className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-2'
                />
                <input value={newProject.techIds} onChange={(event) => setNewProject((prev) => ({ ...prev, techIds: event.target.value }))} placeholder='Tech IDs (comma separated)' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newProject.codeUrl} onChange={(event) => setNewProject((prev) => ({ ...prev, codeUrl: event.target.value }))} placeholder='Code URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newProject.liveUrl} onChange={(event) => setNewProject((prev) => ({ ...prev, liveUrl: event.target.value }))} placeholder='Live URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-2' />
              </div>

              <button
                onClick={handleNewProjectCreate}
                type='button'
                disabled={isSaving || !isEditable}
                className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold disabled:opacity-50'
              >
                Add Project
              </button>

              <div className='space-y-4'>
                {projects.map((project) => (
                  <article key={project.id} className='p-4 rounded-lg border border-surfaceMuted bg-[#111418] space-y-3'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                      <input value={project.title} onChange={(event) => updateProjectField(project.id, 'title', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={project.image} onChange={(event) => updateProjectField(project.id, 'image', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(event) => handleAssetUpload(event, 'projects', (publicUrl) => updateProjectField(project.id, 'image', publicUrl))}
                        className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted lg:col-span-2'
                      />
                      <input
                        value={Array.isArray(project.techIds) ? project.techIds.join(', ') : project.techIds}
                        onChange={(event) => updateProjectField(project.id, 'techIds', splitTechIds(event.target.value))}
                        className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted'
                      />
                      <input value={project.codeUrl} onChange={(event) => updateProjectField(project.id, 'codeUrl', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted' />
                      <input value={project.liveUrl} onChange={(event) => updateProjectField(project.id, 'liveUrl', event.target.value)} className='px-3 py-2 rounded-lg bg-background border border-surfaceMuted lg:col-span-2' />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start'>
                      <img
                        src={project.image}
                        alt={project.title}
                        className='w-full max-w-[180px] aspect-[4/3] object-cover rounded-xl border border-surfaceMuted'
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className='space-y-2'>
                        <p className='text-sm text-gray-300'>Preview</p>
                        <h3 className='text-xl font-semibold'>{project.title || 'Untitled project'}</h3>
                        <p className='text-sm break-all text-gray-300'>{project.codeUrl}</p>
                        <p className='text-sm break-all text-gray-300'>{project.liveUrl}</p>
                        <div className='flex flex-wrap gap-2'>
                          {(Array.isArray(project.techIds) ? project.techIds : splitTechIds(project.techIds || '')).map((techId) => (
                            <span key={techId} className='px-2 py-1 rounded-full bg-surfaceMuted text-xs'>
                              {techId}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-3'>
                      <button
                        onClick={() => handleProjectSave(project)}
                        type='button'
                        disabled={isSaving || !isEditable}
                        className='px-3 py-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50'
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleProjectDelete(project.id)}
                        type='button'
                        disabled={isSaving || !isEditable}
                        className='px-3 py-2 rounded-lg bg-red-700 hover:bg-red-600 disabled:opacity-50'
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeSection === 'resume' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <h2 className='text-2xl font-semibold'>Resume</h2>

              <input
                value={resume.file}
                onChange={(event) => setResume((previous) => ({ ...previous, file: event.target.value }))}
                placeholder='Resume URL'
                className='w-full px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted'
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input
                  value={resume.label.en}
                  onChange={(event) => setResume((previous) => ({ ...previous, label: { ...previous.label, en: event.target.value } }))}
                  placeholder='Button label EN'
                  className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted'
                />
                <input
                  value={resume.label.pt}
                  onChange={(event) => setResume((previous) => ({ ...previous, label: { ...previous.label, pt: event.target.value } }))}
                  placeholder='Button label PT'
                  className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted'
                />
              </div>

              <div className='flex flex-wrap items-center gap-3'>
                <input type='file' accept='application/pdf' onChange={handleResumeUpload} disabled={!isEditable || isSaving} />
                <button
                  type='button'
                  onClick={handleResumeSave}
                  disabled={isSaving || !isEditable}
                  className='px-4 py-2 rounded-lg bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold disabled:opacity-50'
                >
                  Save Resume
                </button>
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </ProtectedAdminRoute>
  );
}

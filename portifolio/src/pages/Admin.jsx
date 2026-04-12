import { useEffect, useMemo, useState } from 'react';
import ProtectedAdminRoute from '../components/admin/ProtectedAdminRoute';
import { getContentSource, getPortfolioContent, removeProject, saveContent, saveProject, saveResume, uploadResumeFile } from '../services/content/contentService';
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

export default function Admin() {
  const { content, isLoading } = usePortfolioContent();
  const [draftContent, setDraftContent] = useState(content);
  const [projects, setProjects] = useState(content.projects);
  const [resume, setResume] = useState(content.resume);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
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

  const hasProfileChanges = useMemo(
    () => JSON.stringify({ profile: draftContent.profile, socialLinks: draftContent.socialLinks }) !== JSON.stringify({ profile: content.profile, socialLinks: content.socialLinks }),
    [draftContent.profile, draftContent.socialLinks, content.profile, content.socialLinks]
  );

  const hasTechnologyChanges = useMemo(
    () => JSON.stringify(draftContent.technologies) !== JSON.stringify(content.technologies),
    [draftContent.technologies, content.technologies]
  );

  const hasProjectChanges = useMemo(
    () => JSON.stringify(projects) !== JSON.stringify(content.projects),
    [projects, content.projects]
  );

  const hasResumeChanges = useMemo(
    () => JSON.stringify(resume) !== JSON.stringify(content.resume),
    [resume, content.resume]
  );

  const pendingChanges = hasProfileChanges || hasTechnologyChanges || hasProjectChanges || hasResumeChanges;

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

  const handleContentSave = async () => {
    setErrorMessage('');
    setStatusMessage('');
    setIsSaving(true);

    try {
      const updatedContent = await saveContent(draftContent);
      setDraftContent(updatedContent);
      setStatusMessage('Profile, links and technologies saved successfully.');
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
              { id: 'technologies', label: 'Technologies' },
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
                  onClick={handleContentSave}
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
                  <input value={draftContent.profile.photo.alt} onChange={(event) => updateDraftField('profile.photo.alt', event.target.value)} placeholder='Profile photo alt text' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-2' />
                  <input value={draftContent.profile.greeting.en} onChange={(event) => updateDraftField('profile.greeting.en', event.target.value)} placeholder='Greeting EN' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                  <input value={draftContent.profile.greeting.pt} onChange={(event) => updateDraftField('profile.greeting.pt', event.target.value)} placeholder='Greeting PT' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                  <input value={draftContent.profile.role.en} onChange={(event) => updateDraftField('profile.role.en', event.target.value)} placeholder='Role EN' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                  <input value={draftContent.profile.role.pt} onChange={(event) => updateDraftField('profile.role.pt', event.target.value)} placeholder='Role PT' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                  <textarea value={draftContent.profile.about.en} onChange={(event) => updateDraftField('profile.about.en', event.target.value)} placeholder='About EN' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-2 min-h-28' />
                  <textarea value={draftContent.profile.about.pt} onChange={(event) => updateDraftField('profile.about.pt', event.target.value)} placeholder='About PT' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted lg:col-span-2 min-h-28' />
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
                <h2 className='text-2xl font-semibold'>Technologies</h2>
                <button
                  type='button'
                  onClick={handleContentSave}
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

          {activeSection === 'projects' ? (
            <section className='p-5 rounded-xl bg-surface border border-surfaceMuted space-y-4'>
              <h2 className='text-2xl font-semibold'>Projects</h2>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input value={newProject.title} onChange={(event) => setNewProject((prev) => ({ ...prev, title: event.target.value }))} placeholder='Project title' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
                <input value={newProject.image} onChange={(event) => setNewProject((prev) => ({ ...prev, image: event.target.value }))} placeholder='Image URL' className='px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted' />
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

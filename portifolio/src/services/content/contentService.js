import { validatePortfolioContent } from '../../lib/contentSchema';
import { localContentAdapter, localPortfolioContent } from './localContentAdapter';
import { supabaseContentAdapter } from './supabaseContentAdapter';

const adapters = {
  local: localContentAdapter,
  supabase: supabaseContentAdapter,
};

const CACHE_PREFIX = 'portfolio-content-cache:v3';

const getCacheKey = (source) => `${CACHE_PREFIX}:${source}`;

const readCachedContent = (source) => {
  try {
    const cached = window.localStorage.getItem(getCacheKey(source));
    if (!cached) {
      return null;
    }

    return JSON.parse(cached);
  } catch (error) {
    console.warn('Unable to read cached portfolio content:', error);
    return null;
  }
};

const writeCachedContent = (source, content) => {
  try {
    window.localStorage.setItem(getCacheKey(source), JSON.stringify(content));
  } catch (error) {
    console.warn('Unable to cache portfolio content:', error);
  }
};

const getAdapterName = () => {
  const source = import.meta.env.VITE_CONTENT_SOURCE;
  return source && adapters[source] ? source : 'local';
};

export const getPortfolioContent = async () => {
  const adapterName = getAdapterName();
  const adapter = adapters[adapterName];
  const cachedContent = typeof window !== 'undefined' ? readCachedContent(adapterName) : null;

  if (cachedContent && adapterName === 'local') {
    return validatePortfolioContent(cachedContent, localPortfolioContent).content;
  }

  try {
    const rawContent = await adapter.getContent();
    const result = validatePortfolioContent(rawContent, localPortfolioContent);

    if (!result.isValid) {
      console.warn('Content validation fallback applied:', result.errors);
    }

    if (typeof window !== 'undefined') {
      writeCachedContent(adapterName, result.content);
    }

    return result.content;
  } catch (error) {
    console.error('Content service error, fallback to local content:', error);

    if (cachedContent) {
      return validatePortfolioContent(cachedContent, localPortfolioContent).content;
    }

    return localPortfolioContent;
  }
};

export const getDefaultPortfolioContent = () => localPortfolioContent;

export const getContentSource = () => getAdapterName();

const requireEditableAdapter = () => {
  const adapterName = getAdapterName();
  const adapter = adapters[adapterName];

  if (!adapter || typeof adapter.saveContent !== 'function') {
    throw new Error('Editing is unavailable for current content source. Set VITE_CONTENT_SOURCE=supabase.');
  }

  return adapter;
};

const validateAndReturn = (content) => {
  const result = validatePortfolioContent(content, localPortfolioContent);
  if (!result.isValid) {
    console.warn('Content validation fallback applied after write:', result.errors);
  }

  if (typeof window !== 'undefined') {
    writeCachedContent(getAdapterName(), result.content);
  }

  return result.content;
};

export const saveProject = async (project) => {
  const adapter = requireEditableAdapter();
  const content = await adapter.saveProject(project);
  return validateAndReturn(content);
};

export const removeProject = async (projectId) => {
  const adapter = requireEditableAdapter();
  const content = await adapter.deleteProject(projectId);
  return validateAndReturn(content);
};

export const saveResume = async (resume) => {
  const adapter = requireEditableAdapter();
  const content = await adapter.updateResume(resume);
  return validateAndReturn(content);
};

export const saveContent = async (content) => {
  const adapter = requireEditableAdapter();

  if (typeof adapter.saveContent !== 'function') {
    throw new Error('Full content editing is not available for the current content source.');
  }

  const savedContent = await adapter.saveContent(content);
  return validateAndReturn(savedContent);
};

export const uploadResumeFile = async (file) => {
  const adapter = requireEditableAdapter();

  if (typeof adapter.uploadResumeFile !== 'function') {
    throw new Error('Resume upload is not available for the current content source.');
  }

  return adapter.uploadResumeFile(file);
};

export const uploadPortfolioAssetFile = async (file, folder) => {
  const adapter = requireEditableAdapter();

  if (typeof adapter.uploadPortfolioAssetFile !== 'function') {
    throw new Error('Asset upload is not available for the current content source.');
  }

  return adapter.uploadPortfolioAssetFile(file, folder);
};

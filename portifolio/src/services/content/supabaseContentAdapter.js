import { localPortfolioContent } from './localContentAdapter';
import { supabase } from '../../lib/supabaseClient';

const CONTENT_TABLE = import.meta.env.VITE_SUPABASE_CONTENT_TABLE || 'portfolio_content';
const CONTENT_ROW_ID = Number(import.meta.env.VITE_SUPABASE_CONTENT_ROW_ID || 1);
const RESUME_BUCKET = import.meta.env.VITE_SUPABASE_RESUME_BUCKET || 'resume-files';

const assertSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }
};

const upsertContentRow = async (content) => {
  assertSupabase();

  const payload = {
    id: CONTENT_ROW_ID,
    data: content,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from(CONTENT_TABLE).upsert(payload, { onConflict: 'id' });

  if (error) {
    throw error;
  }
};

export const supabaseContentAdapter = {
  async getContent() {
    assertSupabase();

    const { data, error } = await supabase
      .from(CONTENT_TABLE)
      .select('data')
      .eq('id', CONTENT_ROW_ID)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data?.data) {
      await upsertContentRow(localPortfolioContent);
      return localPortfolioContent;
    }

    return data.data;
  },

  async saveContent(content) {
    await upsertContentRow(content);
    return content;
  },

  async saveProject(project) {
    const content = await this.getContent();
    const existingIndex = content.projects.findIndex((item) => item.id === project.id);

    if (existingIndex >= 0) {
      content.projects[existingIndex] = project;
    } else {
      content.projects.push(project);
    }

    await upsertContentRow(content);
    return content;
  },

  async deleteProject(projectId) {
    const content = await this.getContent();
    content.projects = content.projects.filter((project) => project.id !== projectId);

    await upsertContentRow(content);
    return content;
  },

  async updateResume(resume) {
    const content = await this.getContent();
    content.resume = resume;

    await upsertContentRow(content);
    return content;
  },

  async uploadResumeFile(file) {
    assertSupabase();

    const filePath = `resume/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(RESUME_BUCKET).upload(filePath, file, {
      upsert: true,
      contentType: file.type || 'application/pdf',
    });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from(RESUME_BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
  },
};

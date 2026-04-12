import { isAllowedAdminEmail, supabase } from '../../lib/supabaseClient';

export const getCurrentSession = async () => {
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
};

export const sendMagicLink = async (email) => {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const normalizedEmail = (email || '').trim().toLowerCase();
  if (!isAllowedAdminEmail(normalizedEmail)) {
    throw new Error('This email is not allowed to access the admin area.');
  }

  const redirectTo = `${window.location.origin}/admin`;

  const { error } = await supabase.auth.signInWithOtp({
    email: normalizedEmail,
    options: { emailRedirectTo: redirectTo },
  });

  if (error) {
    throw error;
  }
};

export const signOutAdmin = async () => {
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

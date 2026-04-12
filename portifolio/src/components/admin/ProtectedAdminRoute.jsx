import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { isAllowedAdminEmail, isSupabaseConfigured, supabase } from '../../lib/supabaseClient';
import { getCurrentSession, sendMagicLink } from '../../services/auth/adminAuthService';
import AdminLogin from './AdminLogin';

export default function ProtectedAdminRoute({ children, isEnglish }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const currentSession = await getCurrentSession();
        if (mounted) {
          setSession(currentSession);
        }
      } catch (error) {
        if (mounted) {
          setErrorMessage(error.message || 'Failed to load admin session.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    if (!supabase) {
      return () => {
        mounted = false;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const canAccess = useMemo(() => {
    const email = session?.user?.email;
    if (!email) return false;
    return isAllowedAdminEmail(email);
  }, [session]);

  const handleLogin = async (email) => {
    setErrorMessage('');
    setAuthLoading(true);

    try {
      await sendMagicLink(email);
      setErrorMessage(isEnglish ? 'Magic link sent. Check your inbox.' : 'Magic link enviado. Verifique seu email.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to send magic link.');
    } finally {
      setAuthLoading(false);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <section className='min-h-screen flex items-center justify-center px-4'>
        <div className='max-w-xl bg-surface border border-surfaceMuted rounded-2xl p-6 text-center'>
          <h1 className='text-2xl sm:text-3xl font-semibold mb-3'>
            {isEnglish ? 'Admin Setup Required' : 'Configuracao Admin Necessaria'}
          </h1>
          <p className='text-gray-300'>
            {isEnglish
              ? 'Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable owner-only editing.'
              : 'Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para habilitar a edicao owner-only.'}
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className='min-h-screen flex items-center justify-center'>
        <p>{isEnglish ? 'Loading admin...' : 'Carregando admin...'}</p>
      </section>
    );
  }

  if (!canAccess) {
    return (
      <section className='min-h-screen flex items-center justify-center px-4'>
        <AdminLogin
          onSubmit={handleLogin}
          isLoading={authLoading}
          errorMessage={errorMessage}
          isEnglish={isEnglish}
        />
      </section>
    );
  }

  return children;
}

ProtectedAdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isEnglish: PropTypes.bool.isRequired,
};

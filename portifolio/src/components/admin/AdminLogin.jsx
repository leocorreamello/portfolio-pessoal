import { useState } from 'react';
import PropTypes from 'prop-types';

export default function AdminLogin({ onSubmit, isLoading, errorMessage, isEnglish }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md bg-surface p-6 rounded-2xl border border-surfaceMuted shadow-lg'>
      <h1 className='text-2xl sm:text-3xl font-semibold mb-4'>
        {isEnglish ? 'Admin Login' : 'Login de Administrador'}
      </h1>
      <p className='text-sm sm:text-base text-gray-300 mb-6'>
        {isEnglish
          ? 'Use your owner email to receive a secure magic link.'
          : 'Use seu email de dono para receber um magic link seguro.'}
      </p>

      <label className='block text-sm mb-2' htmlFor='admin-email'>
        Email
      </label>
      <input
        id='admin-email'
        type='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className='w-full px-3 py-2 rounded-lg bg-[#111418] border border-surfaceMuted mb-4'
        placeholder='you@example.com'
        required
      />

      {errorMessage ? <p className='text-red-400 text-sm mb-4'>{errorMessage}</p> : null}

      <button
        type='submit'
        className='w-full bg-gradient-to-r from-accentStart to-accentEnd text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-60'
        disabled={isLoading}
      >
        {isLoading
          ? isEnglish
            ? 'Sending...'
            : 'Enviando...'
          : isEnglish
            ? 'Send Magic Link'
            : 'Enviar Magic Link'}
      </button>
    </form>
  );
}

AdminLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  isEnglish: PropTypes.bool.isRequired,
};

AdminLogin.defaultProps = {
  errorMessage: '',
};

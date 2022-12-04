import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../utils/i18n';
import { Link, useRouter } from '@tanstack/react-router';

export default function Header() {
  const { t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const {
    state: { isFetching }
  } = useRouter();

  return (
    <header className="grid grid-flow-col p-4 bg-purple-600 justify-between">
      <nav className="flex gap-4 text-white">
        <Link to="/home" activeProps={() => ({ className: 'font-bold' })}>
          {t('home')}
        </Link>
        <Link to="/user" activeProps={() => ({ className: 'font-bold' })}>
          {t('user')}
        </Link>
      </nav>
      <div className="text-white">{isFetching ? 'Loading...' : ''}</div>
      <div className="flex gap-2 text-white">
        <button onClick={() => handleLanguageChange('en')}>EN</button>
        <button onClick={() => handleLanguageChange('tr')}>TR</button>
      </div>
    </header>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../utils/i18n';
import { Link, useRouter } from '@tanstack/react-router';
import { faker } from '@faker-js/faker';

export default function Header() {
  const { t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    faker.locale = language;
    i18n.changeLanguage(language);
  };

  const {
    store: { isFetching }
  } = useRouter();

  return (
    <header className="grid grid-flow-col p-4 bg-purple-600 justify-between items-center">
      <nav className="flex gap-4 text-white">
        <Link to="/home" activeProps={() => ({ className: 'font-bold' })}>
          {t('home')}
        </Link>
        <Link to="/user" activeProps={() => ({ className: 'font-bold' })}>
          {t('user')}
        </Link>
      </nav>
      <div className="text-white">{isFetching ? 'Loading...' : ''}</div>
      <div className="text-white grid items-center justify-items-center grid-flow-col gap-2">
        <div className="flex gap-2 border border-solid border-purple-400 p-1 rounded-lg">
          <button onClick={() => handleLanguageChange('en')}>EN</button>
          <button onClick={() => handleLanguageChange('tr')}>TR</button>
        </div>
        <Link to="/profile" className="p-1 border border-solid border-purple-400 rounded-lg">
          My Profile
        </Link>
      </div>
    </header>
  );
}

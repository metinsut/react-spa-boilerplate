import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import i18n from '../../utils/i18n';

export default function Header() {
  const { t } = useTranslation();

  const headerClass = (isActive: boolean, isPending: boolean) => {
    let classNames = '';
    classNames = classNames + (isActive ? 'text-white' : 'text-grey');
    classNames = classNames + (isPending ? 'pending' : '');
    return classNames;
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="grid grid-flow-col p-4 bg-purple-600 justify-between">
      <nav className="flex gap-4 text-white">
        <NavLink to="/" className={({ isActive, isPending }) => headerClass(isActive, isPending)}>
          {t('home')}
        </NavLink>
        <NavLink
          to="/user"
          className={({ isActive, isPending }) => headerClass(isActive, isPending)}>
          {t('user')}
        </NavLink>
      </nav>
      <div className="flex gap-2 text-white">
        <button onClick={() => handleLanguageChange('en')}>EN</button>
        <button onClick={() => handleLanguageChange('tr')}>TR</button>
      </div>
    </header>
  );
}

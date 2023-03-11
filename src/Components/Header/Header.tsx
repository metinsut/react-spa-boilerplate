import MockHazardTape from 'mocks/MockHazardTape';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import i18n from '../../utils/i18n';

export default function Header() {
  const { t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <MockHazardTape />
      <header className="grid grid-flow-col p-4 bg-purple-600 justify-between items-center sticky top-0 w-full left-0">
        <nav className="flex gap-4 text-white">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'font-bold' : ''
            }>
            {t('home')}
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'font-bold' : ''
            }>
            {t('user')}
          </NavLink>
        </nav>
        {/* <div className="text-white">{isFetching ? 'Loading...' : ''}</div> */}
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
    </>
  );
}

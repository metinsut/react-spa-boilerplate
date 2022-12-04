import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-4xl">{t('title')}</h1>
      <h1 className="font-bold text-4xl">{t('title')}</h1>
      <h1 className="italic text-4xl">{t('title')}</h1>
    </div>
  );
}

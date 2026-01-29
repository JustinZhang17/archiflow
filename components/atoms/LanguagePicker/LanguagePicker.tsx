// External Imports
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';

const LanguagePicker = () => {
  const router = useRouter();
  const t = useTranslations('language');
  const { locales, locale: currentLocale, pathname, asPath, query } = router;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="select select-sm absolute bottom-4 left-4 z-50"
    >
      {locales?.map((loc) => (
        <option key={loc} value={loc}>
          {t(loc)}
        </option>
      ))}
    </select>
  );
}

export default LanguagePicker;

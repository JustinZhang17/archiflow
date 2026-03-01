import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import { META } from "@/constants/meta";

const PageHead = () => {
  const t = useTranslations('meta');
  const { asPath, locales } = useRouter();

  return (
    <Head>
      <title>{t('title')}</title>
      <meta name="description" content={t('description')} />

      <meta property="og:title" content={t('title')} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={t('description')} />

      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Canonical Link */}
      <link rel="canonical" href={`${META.URL}${asPath}`} />

      {/* Hreflang Tags (Vital for SEO) */}
      {locales?.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${META.URL}/${locale}${asPath}`}
        />
      ))}
    </Head>
  );
}

export default PageHead;

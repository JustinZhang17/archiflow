// External Imports
import type { AppProps } from "next/app";
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

// Internal Imports
import "@/styles/globals.css";
import { Loading } from "@/components/organisms/LoadingScreen";
import PageHead from "@/components/global/PageHead/PageHead";

const satoshi = localFont({
  src: [
    {
      path: '../styles/fonts/Satoshi/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    }
  ],
  variable: '--font-satoshi',
})

const erode = localFont({
  src: [
    {
      path: '../styles/fonts/Erode/Erode-Regular.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-erode',
})

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale || 'en'}
      timeZone="UTC"
      messages={pageProps.messages}
    >
      <PageHead />
      <main className={`${satoshi.variable} ${erode.variable} font-sans`}>
        <Loading>
          <Component {...pageProps} />
        </Loading>
      </main>
    </NextIntlClientProvider>
  )
}

export default App;

// External Imports
import type { AppProps } from "next/app";
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

// Internal Imports
import "@/styles/globals.css";

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
      <main className={`${satoshi.variable} ${erode.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </NextIntlClientProvider>
  )
}

export default App;

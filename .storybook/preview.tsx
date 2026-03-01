import type { Decorator, Preview } from '@storybook/nextjs-vite'

import { NextIntlClientProvider } from 'next-intl';

import { Loading } from '@/components/organisms/LoadingScreen';
import en from "@/messages/en.json"
import "@/styles/globals.css";

const globalTypes = {
  containerLayout: {
    description: 'Layout wrapper for the component',
    defaultValue: 'none',
    toolbar: {
      title: 'Layout',
      icon: 'outline',
      items: [
        { value: 'none', title: 'None' },
      ],
      dynamicTitle: true,
    },
  },
}

const Wrapper: Decorator = (Story, context) => {
  const layout = context.globals.containerLayout;
  return (
    <NextIntlClientProvider locale={"en"} timeZone={"UTC"} messages={en} >
      <Loading>
        <div className={layout}>
          <Story />
        </div>
      </Loading>
    </NextIntlClientProvider>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [Wrapper],
};

export { preview as default, globalTypes };

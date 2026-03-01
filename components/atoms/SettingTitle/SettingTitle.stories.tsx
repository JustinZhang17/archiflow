// External Imports
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Internal Imports
import SettingTitle from '@/components/atoms/SettingTitle/SettingTitle';

const layoutOptions = {
  default: 'w-64',
  wide: 'w-96',
}

const meta: Meta = {
  title: 'Atoms/SettingTitle',
  component: SettingTitle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The title text to display for the settings section',
    },
    layoutVariant: {
      options: Object.keys(layoutOptions),
      control: { type: 'select' },
      mapping: layoutOptions,
      description: 'Choose the layout width'
    }
  },
  decorators: [
    (Story, context) => (
      <div className={context.args.layoutVariant}>
        <Story />
      </div>
    )
  ]
};

// Default story 
const Default: StoryObj<typeof meta> = {
  args: {
    children: 'General Settings',
    layoutVariant: 'default',
  }
};


export {
  meta as default,
  Default,
};

// External Imports
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Internal Imports
import SettingEntry from '@/components/atoms/SettingEntry/SettingEntry';


const meta: Meta = {
  title: 'Atoms/SettingEntry',
  component: SettingEntry,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title text to display'
    },
    description: {
      control: 'text',
      description: 'A brief description of the setting'
    },
    children: {
      control: 'object',
      description: 'The interactive element for the setting'
    },
  },
};

// Default story 
const Default: StoryObj<typeof meta> = {
  args: {
    title: 'Language',
    description: 'Select your preferred language for the application interface.',
    children: <button className="btn btn-sm">Button</button>,
  }
};


export {
  meta as default,
  Default,
};

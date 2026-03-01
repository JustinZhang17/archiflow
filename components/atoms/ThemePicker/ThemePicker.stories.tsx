// External Imports
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Internal Imports
import ThemePicker from '@/components/atoms/ThemePicker/ThemePicker';

const meta: Meta<typeof ThemePicker> = {
  title: 'Atoms/ThemePicker',
  component: ThemePicker,
  parameters: {
    layout: 'centered',
  },
};

// Default story 
const Default: StoryObj<typeof meta> = {};


export {
  meta as default,
  Default,
};

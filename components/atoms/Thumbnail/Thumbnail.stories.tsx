// External Imports
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Internal Imports
import { Thumbnail } from '@/components/atoms/Thumbnail/Thumbnail';

const meta: Meta<typeof Thumbnail> = {
  title: 'Atoms/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    url: {
      control: 'text',
      description: 'URL or path to the thumbnail image',
    },
  },
};

// Default story with placeholder image  
const Default: StoryObj<typeof meta> = {
  args: {
    url: 'https://placehold.co/300x300/png?text=Thumbnail',
  },
};

// Story with local model image (simulating actual use case)  
const ModelImage: StoryObj<typeof meta> = {
  args: {
    url: '/models/Bowl/thumbnail.png',
  },
};

// Story with broken image URL to test error handling  
const BrokenImage: StoryObj<typeof meta> = {
  args: {
    url: 'https://invalid-url-that-will-fail.com/image.jpg',
  },
};

export {
  meta as default,
  Default,
  ModelImage,
  BrokenImage
};

// External Imports 
import { ComponentType } from 'react';

const context = require.context('/public/models', true, /\.jsx$/);

const ModelRegistry: Record<string, ComponentType<any>> = {};

context.keys().forEach((key: string) => {
  const fileName = key.split('/').pop() || '';
  const name = fileName.replace('.jsx', '');

  const module = context(key);

  const Component = module[name] || module.default;

  if (Component) ModelRegistry[name] = Component;
});

export { ModelRegistry };

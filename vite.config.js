import { defineConfig } from 'vite';

const baseConfig = defineConfig({
  publicDir: 'public',
});

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      ...baseConfig,
      base: '/team-mw-project-1/',
    };
  }

  return baseConfig;
});

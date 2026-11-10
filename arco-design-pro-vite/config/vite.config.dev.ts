import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base.ts';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
    plugins: [],
  },
  baseConfig
);

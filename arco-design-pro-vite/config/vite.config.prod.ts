import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base.ts';
import configCompressPlugin from './plugin/compress.ts';
import configVisualizerPlugin from './plugin/visualizer.ts';

export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
    ],
    build: {
      cssMinify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/@ekworp/arco-design-vue/es/icon/')) {
              return 'icons';
            }
            if (
              id.includes('node_modules/@ekworp/arco-design-vue') &&
              !id.includes('/es/icon/')
            ) {
              return 'arco';
            }
            if (id.includes('node_modules/echarts') || id.includes('node_modules/vue-echarts')) return 'chart';
            if (
              id.includes('node_modules/vue/') ||
              id.includes('node_modules/vue-router') ||
              id.includes('node_modules/pinia') ||
              id.includes('node_modules/@vueuse') ||
              id.includes('node_modules/vue-i18n')
            ) return 'vue';
            return undefined;
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig
);

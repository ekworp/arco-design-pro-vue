import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';

export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/@ekworp/arco-design-vue')) return 'arco';
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

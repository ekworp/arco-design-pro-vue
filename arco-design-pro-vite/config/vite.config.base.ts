import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import configArcoResolverPlugin from './plugin/arcoResolver.ts';
import configArcoStyleImportPlugin from './plugin/arcoStyleImport.ts';

const rootDir = import.meta.dirname;

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    configArcoResolverPlugin(),
    configArcoStyleImportPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(rootDir, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(rootDir, '../src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            rootDir,
            '../src/assets/style/breakpoint.less'
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});

/**
 * Theme import
 * 样式按需引入
 * https://github.com/arco-design/arco-plugins/blob/main/packages/plugin-vite-vue/README.md
 * https://arco.design/vue/docs/start
 */
import { vitePluginForArco } from '@arco-plugins/vite-vue';

export default function configArcoStyleImportPlugin() {
  // Component styles are already injected by the custom unplugin resolver.
  // Disable the legacy JS parser to avoid transforming every source file.
  const arcoResolverPlugin = vitePluginForArco({ style: false });
  return arcoResolverPlugin;
}

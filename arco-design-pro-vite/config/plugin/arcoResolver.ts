import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

const ARCO_PACKAGE = '@ekworp/arco-design-vue';
const OFFICIAL_ARCO_PACKAGE = '@arco-design/web-vue';

function replacePackage(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.map((item) => item.replace(OFFICIAL_ARCO_PACKAGE, ARCO_PACKAGE));
  }
  return value?.replace(OFFICIAL_ARCO_PACKAGE, ARCO_PACKAGE);
}

export default function configArcoResolverPlugin() {
  const resolver = ArcoResolver({
    importStyle: 'css',
    resolveIcons: true,
  });

  return Components({
    dts: 'components.d.ts',
    dirs: [],
    deep: false,
    resolvers: [
      {
        ...resolver,
        resolve(name) {
          const result = resolver.resolve(name);
          if (!result || typeof result !== 'object') return result;

          return {
            ...result,
            from: result.from.replace(OFFICIAL_ARCO_PACKAGE, ARCO_PACKAGE),
            sideEffects: replacePackage(result.sideEffects),
          };
        },
      },
    ],
  });
}

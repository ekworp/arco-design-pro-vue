import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

const VIRTUAL_MODULE_ID = 'virtual:arco-menu-icons';
const RESOLVED_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;
const ICON_PATTERN = /icon\s*:\s*['"](icon-[\w-]+)['"]/g;

function collectRouteFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return collectRouteFiles(path);
    return entry.name.endsWith('.ts') ? [path] : [];
  });
}

function collectMenuIcons(routesDirectory: string) {
  const icons = new Set<string>();
  for (const file of collectRouteFiles(routesDirectory)) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(ICON_PATTERN)) {
      icons.add(match[1]);
    }
  }
  return [...icons].sort();
}

export default function configArcoIconEntryPlugin(): Plugin {
  return {
    name: 'arco-menu-icon-entry',
    resolveId(id) {
      return id === VIRTUAL_MODULE_ID ? RESOLVED_MODULE_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_MODULE_ID) return undefined;

      const icons = collectMenuIcons(
        resolve(import.meta.dirname, '../../src/router/routes')
      );
      const imports = icons
        .map(
          (icon, index) =>
            `import Icon${index} from '@ekworp/arco-design-vue/es/icon/${icon}';`
        )
        .join('\n');
      const entries = icons
        .map((icon, index) => `  '${icon}': Icon${index},`)
        .join('\n');

      return `${imports}\n\nexport const menuIcons = {\n${entries}\n};`;
    },
  };
}

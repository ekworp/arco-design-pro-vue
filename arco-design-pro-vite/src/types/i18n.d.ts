import type { ComposerTranslation } from 'vue-i18n';

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: ComposerTranslation;
  }
}

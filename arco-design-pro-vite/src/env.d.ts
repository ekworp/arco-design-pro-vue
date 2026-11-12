/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENABLE_MOCK?: string;
}

declare module 'virtual:arco-menu-icons' {
  import type { Component } from 'vue';

  export const menuIcons: Record<string, Component>;
}

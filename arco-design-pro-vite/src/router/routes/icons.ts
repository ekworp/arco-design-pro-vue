import type { Component } from 'vue';
import { menuIcons } from 'virtual:arco-menu-icons';

export function resolveMenuIcon(icon: string | Component | undefined) {
  if (!icon || typeof icon !== 'string') return icon;

  return menuIcons[icon];
}

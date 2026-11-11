<template>
  <a-config-provider :locale="arcoLocale">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import GlobalSetting from '@/components/global-setting/index.vue';
  import { arcoLocale } from '@/locale';
  import useLocale from '@/hooks/locale';

  useLocale();
</script>

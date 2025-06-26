<script setup lang="ts">
import { currentLang } from '~/i18n'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

function toggleLanguage() {
  currentLang.value = currentLang.value === 'zh-CN' ? 'en' : 'zh-CN'
}
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <div class="flex justify-end mb-2">
      <button
        class="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
        @click="toggleLanguage"
      >
        {{ currentLang === 'zh-CN' ? 'EN' : '中' }}
      </button>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center;">
      <img src="../assets/logo.png" style="width: 50px; height: 50px; object-fit: contain;" alt="tyche logo">
      <div style="margin: 8px 0; font-size: 12px; font-weight: bold;">
        tyche用户备注插件
      </div>
    </div>
    <button class="btn mt-2 w-full" @click="openOptionsPage">
      {{ $t('popup.备注管理') }}
    </button>
    <div class="mt-2">
      <a class="icon-btn mx-2 text-2xs" rel="noreferrer" href="http://luckydog.run" target="_blank" title="太极幸运狗官网">
        太极幸运狗
      </a>赋能出品
    </div>
  </main>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200;
}
</style>

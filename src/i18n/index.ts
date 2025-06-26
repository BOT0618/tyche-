import { createI18n } from 'vue-i18n'
import translations from '../locales/translations.json'
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

type Language = 'en' | 'zh-CN'

// 创建一个存储当前语言的状态
export const { data: currentLang } = useWebExtensionStorage<Language>('language', 'zh-CN')

export const i18n = createI18n({
  legacy: false,
  locale: currentLang.value,
  fallbackLocale: 'en',
  messages: translations,
  // 禁用运行时编译以避免 CSP 限制
  runtimeOnly: false,
  // 禁用 HTML 转义以避免使用 Function
  escapeParameter: true,
  // 使用编译模式
  allowComposition: true,
})

// 监听语言变化
watch(currentLang, (newLang) => {
  i18n.global.locale.value = newLang as Language
})

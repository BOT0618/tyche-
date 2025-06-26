import { onMessage, sendMessage } from 'webext-bridge/background'
import type { Tabs } from 'webextension-polyfill'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

// remove or turn this off if you don't use side panel
const USE_SIDE_PANEL = false

// to toggle the sidepanel with the action button in chromium:
if (USE_SIDE_PANEL) {
  // @ts-expect-error missing types
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: unknown) => console.error(error))
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

// 监听由 history.pushState() 等API触发的客户端导航
// 这对单页应用（如React, Vue, Angular网站）的前进后退和内部跳转非常有效
browser.webNavigation.onHistoryStateUpdated.addListener((details) => {
  // details.url 包含了导航完成后的新URL
  // details.tabId 是目标标签页的ID
  routeLogic(details.tabId, details.url)
})

// 同时监听完整的页面加载（以覆盖非SPA网站或首次加载）
browser.webNavigation.onCompleted.addListener((details) => {
  // 过滤掉iframe等子框架的加载事件
  if (details.frameId === 0) {
    routeLogic(details.tabId, details.url)
  }
})

// 统一的路由处理逻辑
function routeLogic(tabId: number, url: string) {
  if (url.includes('/profile/')) {
    // 通知内容脚本执行 handleProfilePage
    sendMessage('handleProfilePage', { }, { context: 'content-script', tabId })
  }
  else if (url.includes('/lucky-pump/')) {
    // 通知内容脚本执行 handleTokenPage
    sendMessage('handleTokenPage', { }, { context: 'content-script', tabId })
  }
}

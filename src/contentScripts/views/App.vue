<script setup lang="ts">
import 'uno.css'
import { createApp, h, onMounted, watch } from 'vue'
import { onMessage } from 'webext-bridge/content-script'
import RemarkButton from './RemarkButton.vue'
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import type { RemarkItem, RemarkList } from '~/types/remark'

const remarkStorage = useWebExtensionStorage<RemarkList>('remark-list', [])
async function handleTokenPage() {
  const observerElement = document.querySelector('div[data-state="active"][role="tabpanel"]')?.parentElement
  if (!observerElement) {
    return
  }

  // 使用 MutationObserver 监听表格内容的变化
  const observer = new MutationObserver(() => {
  // 查找交易记录表格的 tbody
    const tradeTableBody: HTMLElement | null = document.querySelector('div[data-state="active"][role="tabpanel"] table tbody')

    if (!tradeTableBody) {
      console.error('未找到交易记录表格体，Token页面处理中止。')
      return
    }
    // 找到当前选中的表格tab
    const activeTab = document.querySelector('div[data-state="active"][role="tabpanel"]')
    if (activeTab?.id.includes('trade')) {
      const addressCells = tradeTableBody.querySelectorAll('tr > td:last-child > div.font-medium')
      processRecords(addressCells, remarkStorage.data.value)
    }
    else if (activeTab?.id.includes('holders')) {
      const addressCells = tradeTableBody.querySelectorAll('tr > td:nth-child(2) > div > span')
      processRecords(addressCells, remarkStorage.data.value)
    }
    else if (activeTab?.id.includes('comments')) {
      const addressCells = document.querySelectorAll('div[data-state="active"][role="tabpanel"] a')
      processRecords(addressCells, remarkStorage.data.value)
    }
    else if (activeTab?.id.includes('lp')) {
      const addressCells = tradeTableBody.querySelectorAll('tr > td:nth-child(1) > div.font-medium')
      processRecords(addressCells, remarkStorage.data.value)
    }
    else if (activeTab?.id.includes('vault')) {
      const addressCells = document.querySelectorAll('div[data-state="active"][role="tabpanel"] table tbody tr > td:nth-child(1)')
      processRecords(addressCells, remarkStorage.data.value)
    }
  })

  observer.observe(observerElement, {
    childList: true, // 监听子节点的添加或移除
    subtree: true, // 监听所有后代节点的改变
    characterData: true, // 监听文本内容的改变 (虽然这里主要关注结构变化，但保留无害)
    attributes: true,
    attributeFilter: ['data-state'],
  })

  // 监听备注存储的变化，确保备注更新时，Token 页面也刷新
  // 这是一个非常重要的改进，当用户添加/修改备注时，Token页面会立即更新
  watch(remarkStorage.data, () => {
    // 强制清除所有已处理标记，让所有地址重新匹配
    document.querySelectorAll('[data-remark-processed]').forEach((el) => {
      el.removeAttribute('data-remark-processed')
    })
    handleTokenPage()
  }, { deep: true })
}

// 处理列表中的地址
function processRecords(addressCells: NodeListOf<Element>, remarks: RemarkList) {
  addressCells.forEach((cell: any) => {
    if (cell.getAttribute('data-remark-processed')) {
      return // 已经处理过的地址不再处理
    }
    let displayedAddress = cell.textContent?.trim()
    if (cell.href) {
      const hrefArr = cell.href.split('/')
      displayedAddress = hrefArr[hrefArr.length - 1]
    }
    if (!displayedAddress) {
      return
    }

    let matchedRemark: RemarkItem | undefined
    let originalFullAddress: string | undefined

    let match: string[] | undefined
    // 检查是否是缩略地址格式: 前缀...后缀
    if (displayedAddress.includes('...')) {
      match = displayedAddress.split('...')
    }

    if (match) {
      const prefix = match[0]
      const suffix = match[1]
      // 在完整地址列表中进行模糊匹配
      matchedRemark = remarks.find(r =>
        r.address.startsWith(prefix) && r.address.endsWith(suffix),
      )

      // 如果找到匹配的备注，我们就知道原始完整地址是 r.address
      if (matchedRemark) {
        originalFullAddress = matchedRemark.address
      }
    }
    else {
      // 如果不是缩略地址，就认为是完整的，直接匹配
      matchedRemark = remarks.find(r => r.address === displayedAddress)
      if (matchedRemark) {
        originalFullAddress = matchedRemark.address
      }
    }

    // 应用处理结果
    if (matchedRemark && matchedRemark.note) {
      // 找到备注，替换文本内容并添加样式
      cell.textContent = matchedRemark.note
      cell.style.color = '#FFD700' // 示例颜色
      cell.style.fontWeight = 'bold'
      cell.style.cursor = 'pointer' // 增加可点击样式
    }
    else if (originalFullAddress) {
      // 如果没有备注，或者不是缩略地址但没找到备注，保持原始文本，但仍添加可点击样式和事件
      // 这里的 textContent 保持不变，因为我们没有备注去替换它
      cell.style.cursor = 'pointer'
      cell.addEventListener('click', () => {
        window.open(`https://tyche.run/profile/${originalFullAddress}`, '_blank')
      })
    }
    // 标记为已处理
    cell.setAttribute('data-remark-processed', 'true')
  })
}

function handleProfilePage() {
  // 使用 MutationObserver 监听表格内容的变化
  const observer = new MutationObserver(() => {
    const usernameElement = document.querySelector('h2[class*="Profile_username"]')
    if (!usernameElement || usernameElement.getAttribute('data-remark-mounted')) {
      return
    }
    // address 取url的最后一段
    const hrefArr = window.location.href.split('/')
    const address = hrefArr[hrefArr.length - 1]
    if (!address) {
      return
    }

    usernameElement.setAttribute('data-remark-mounted', 'true')

    const mountPoint = document.createElement('div')
    mountPoint.id = `remark-button-${crypto.randomUUID()}`
    mountPoint.className = 'remark-button-container'
    usernameElement.parentElement?.appendChild(mountPoint)

    const app = createApp({
      setup() {
        return () => h(RemarkButton, { address })
      },
    })
    app.mount(mountPoint)
  })

  observer.observe(document.body, {
    childList: true, // 监听子节点的添加或移除
    subtree: true, // 监听所有后代节点的改变
    characterData: true, // 监听文本内容的改变 (虽然这里主要关注结构变化，但保留无害)
  })
}

onMounted(() => {
  const style = document.createElement('style')
  style.textContent = `
    .remark-button-container {
      display: inline-flex;
      align-items: center;
    }
    .remark-button-container button {
      font-family: system-ui, -apple-system, sans-serif;
    }
    /* 新增交易者地址样式 */
    .traded-address {
        color: #FFD700; /* 金色，突出显示 */
        font-weight: bold;
        cursor: pointer;
    }
    /* 确保输入框样式不被覆盖 */
    .remark-button-container input[type="text"] {
        background-color: white !important;
        color: #1f2937 !important;
        border-color: #d1d5db !important;
        font-family: system-ui, -apple-system, sans-serif !important;
    }
    .remark-button-container input[type="text"]::placeholder {
        color: #9ca3af !important;
    }
  `
  document.head.appendChild(style)
})
onMessage('handleProfilePage', () => {
  handleProfilePage()
})
onMessage('handleTokenPage', () => {
  handleTokenPage()
})
</script>

<template>
  <div />
</template>

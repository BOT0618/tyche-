<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import type { RemarkItem, RemarkList } from '~/types/remark'
import 'uno.css'

const props = defineProps<{
  address: string
}>()

const remarkStorage = useWebExtensionStorage<RemarkList>('remark-list', [])
const currentRemark = ref<RemarkItem | undefined>()
const showInput = ref(false)
const inputValue = ref('')

// 获取当前备注
function getCurrentRemark() {
  const remarks = remarkStorage.data.value
  return Array.isArray(remarks) ? remarks.find(r => r.address === props.address) : undefined
}

// 更新当前备注
function updateCurrentRemark() {
  currentRemark.value = getCurrentRemark()
  inputValue.value = currentRemark.value?.note || ''
}

// 保存备注
async function saveRemark() {
  const remarks = Array.isArray(remarkStorage.data.value) ? remarkStorage.data.value : []
  const index = remarks.findIndex(r => r.address === props.address)
  const note = inputValue.value.trim()

  if (note) {
    const remarkItem: RemarkItem = {
      id: currentRemark.value?.id || crypto.randomUUID(),
      address: props.address,
      note,
      updatedAt: Date.now(),
    }

    if (index !== -1) {
      remarks[index] = remarkItem
    }
    else {
      remarks.push(remarkItem)
    }
  }
  else if (index !== -1) {
    remarks.splice(index, 1)
  }

  remarkStorage.data.value = remarks
  showInput.value = false
  updateCurrentRemark()
}

// 监听存储变化
watch(() => remarkStorage.data.value, () => {
  updateCurrentRemark()
}, { deep: true })

onMounted(() => {
  updateCurrentRemark()
})
</script>

<template>
  <div class="inline-flex items-center ml-2">
    <button
      v-if="!showInput"
      class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-md hover:opacity-80 transition-colors"
      :style="{ backgroundColor: currentRemark ? '#2c3349' : '#2563eb' }"
      @click="showInput = true"
    >
      {{ currentRemark?.note || '添加备注' }}
    </button>
    <div v-else class="flex items-center gap-2">
      <input
        v-model="inputValue"
        type="text"
        class="px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        style="background-color: white !important; color: #1f2937 !important; border-color: #d1d5db !important;"
        placeholder="请输入备注"
        @keyup.enter="saveRemark"
        @keyup.esc="showInput = false"
      >
      <button
        class="inline-flex items-center justify-center px-2 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        @click="saveRemark"
      >
        确定
      </button>
      <button
        class="inline-flex items-center justify-center px-2 py-1 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
        @click="showInput = false"
      >
        取消
      </button>
    </div>
    <button
      class="ml-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      <a :href="`https://luckydog.run/profile?address=${address}`" target="_blank" class="text-white no-underline text-sm font-medium">
        查看PNL
      </a>
    </button>
  </div>
</template>

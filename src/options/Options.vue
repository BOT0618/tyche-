<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRemarkStorage } from '~/composables/useRemarkStorage'
import type { RemarkItem } from '~/types/remark'

const { t } = useI18n()
const {
  remarkList,
  addRemark,
  updateRemark,
  deleteRemark,
  batchDelete,
  exportData,
  importData,
} = useRemarkStorage()

// 选中的行
const selectedRows = ref<string[]>([])

// 编辑状态
const editingId = ref<string | null>(null)
const editForm = ref<Partial<RemarkItem>>({})

// 新增表单
const showAddForm = ref(false)
const newRemark = ref({
  address: '',
  note: '',
})

// 处理编辑
function handleEdit(item: RemarkItem) {
  editingId.value = item.id
  editForm.value = { ...item }
}

// 保存编辑
function handleSave() {
  if (editingId.value && editForm.value) {
    updateRemark(editingId.value, editForm.value)
    editingId.value = null
    editForm.value = {}
  }
}

// 取消编辑
function handleCancel() {
  editingId.value = null
  editForm.value = {}
}

// 处理删除
function handleDelete(id: string) {
  if (window.confirm(t('table.confirm_delete'))) {
    deleteRemark(id)
  }
}

// 处理批量删除
function handleBatchDelete() {
  if (selectedRows.value.length === 0) {
    window.alert(t('table.please_select'))
    return
  }
  if (window.confirm(t('table.confirm_batch_delete', { count: selectedRows.value.length }))) {
    batchDelete(selectedRows.value)
    selectedRows.value = []
  }
}

// 处理新增
function handleAdd() {
  if (!newRemark.value.address) {
    window.alert(t('table.required_fields'))
    return
  }
  addRemark(newRemark.value)
  newRemark.value = {
    address: '',
    note: '',
  }
  showAddForm.value = false
}

// 处理导入
function handleImport(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    importData(file).then((success) => {
      if (success) {
        window.alert(t('table.import_success'))
      }
      else {
        window.alert(t('table.import_failed'))
      }
    })
  }
  input.value = '' // 重置input，允许重复导入同一个文件
}
</script>

<template>
  <main class="px-4 py-10 text-gray-700 dark:text-gray-200">
    <Logo />

    <!-- 工具栏 -->
    <div class="flex justify-between items-center mb-4">
      <div class="space-x-2">
        <button class="btn-primary" @click="showAddForm = true">
          {{ $t('table.add') }}
        </button>
        <button class="btn-danger" :disabled="selectedRows.length === 0" @click="handleBatchDelete">
          {{ $t('table.batch_delete') }}
        </button>
      </div>
      <div class="space-x-2">
        <button class="btn-secondary" @click="exportData">
          {{ $t('table.export') }}
        </button>
        <label class="btn-secondary cursor-pointer">
          {{ $t('table.import') }}
          <input type="file" class="hidden" accept=".json" @change="handleImport">
        </label>
      </div>
    </div>

    <!-- 新增表单 -->
    <div v-if="showAddForm" class="mb-4 p-4 border rounded">
      <div class="grid grid-cols-2 gap-4">
        <input
          v-model="newRemark.address"
          class="input"
          :placeholder="$t('table.address')"
        >
        <input
          v-model="newRemark.note"
          class="input"
          :placeholder="$t('table.note')"
        >
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <button class="btn-secondary" @click="showAddForm = false">
          {{ $t('table.cancel') }}
        </button>
        <button class="btn-primary" @click="handleAdd">
          {{ $t('table.save') }}
        </button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-700">
            <th class="w-10 px-4 py-2">
              <input
                type="checkbox"
                :checked="selectedRows.length === remarkList.length"
                :indeterminate="selectedRows.length > 0 && selectedRows.length < remarkList.length"
                @change="e => selectedRows = e.target.checked ? remarkList.map(item => item.id) : []"
              >
            </th>
            <th class="px-4 py-2 text-left">
              {{ $t('table.address') }}
            </th>
            <th class="px-4 py-2 text-left">
              {{ $t('table.note') }}
            </th>
            <th class="px-4 py-2 text-left">
              {{ $t('table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in remarkList" :key="item.id" class="border-t">
            <td class="px-4 py-2">
              <input
                v-model="selectedRows"
                type="checkbox"
                :value="item.id"
              >
            </td>
            <td class="px-4 py-2">
              <template v-if="editingId === item.id">
                <input v-model="editForm.address" class="input">
              </template>
              <template v-else>
                {{ item.address }}
              </template>
            </td>
            <td class="px-4 py-2">
              <template v-if="editingId === item.id">
                <input v-model="editForm.note" class="input">
              </template>
              <template v-else>
                {{ item.note }}
              </template>
            </td>
            <td class="px-4 py-2">
              <template v-if="editingId === item.id">
                <button class="btn-text text-green-600" @click="handleSave">
                  {{ $t('table.save') }}
                </button>
                <button class="btn-text text-gray-600 ml-2" @click="handleCancel">
                  {{ $t('table.cancel') }}
                </button>
              </template>
              <template v-else>
                <button class="btn-text text-blue-600" @click="handleEdit(item)">
                  {{ $t('table.edit') }}
                </button>
                <button class="btn-text text-red-600 ml-2" @click="handleDelete(item.id)">
                  {{ $t('table.delete') }}
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-10 flex justify-center items-center">
      Powered by<a class="icon-btn mx-2 text-2xs" rel="noreferrer" href="http://luckydog.run" target="_blank">
        Lucky Dog
      </a>
    </div>
  </main>
</template>

<style scoped>
.input {
  @apply px-2 py-1 border rounded focus:outline-none focus:border-blue-500;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200;
}

.btn-danger {
  @apply px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-text {
  @apply p-1 hover:opacity-80;
}
</style>

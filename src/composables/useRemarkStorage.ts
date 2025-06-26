import { useWebExtensionStorage } from './useWebExtensionStorage'
import type { RemarkItem, RemarkList } from '~/types/remark'

export function useRemarkStorage() {
  const { data: remarkList, dataReady } = useWebExtensionStorage<RemarkList>('remark-list', [])

  // 添加备注
  const addRemark = (remark: Omit<RemarkItem, 'id' | 'updatedAt'>) => {
    const newRemark: RemarkItem = {
      ...remark,
      id: crypto.randomUUID(),
      updatedAt: Date.now(),
    }
    remarkList.value = [...remarkList.value, newRemark]
  }

  // 更新备注
  const updateRemark = (id: string, remark: Partial<RemarkItem>) => {
    remarkList.value = remarkList.value.map(item =>
      item.id === id
        ? { ...item, ...remark, updatedAt: Date.now() }
        : item,
    )
  }

  // 删除备注
  const deleteRemark = (id: string) => {
    remarkList.value = remarkList.value.filter(item => item.id !== id)
  }

  // 批量删除
  const batchDelete = (ids: string[]) => {
    remarkList.value = remarkList.value.filter(item => !ids.includes(item.id))
  }

  // 导出数据
  const exportData = () => {
    const data = JSON.stringify(remarkList.value, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `remark-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 导入数据
  const importData = async (file: File) => {
    try {
      const text = await file.text()
      const data = JSON.parse(text) as RemarkList
      remarkList.value = data
      return true
    }
    catch (error) {
      console.error('导入失败:', error)
      return false
    }
  }

  return {
    remarkList,
    dataReady,
    addRemark,
    updateRemark,
    deleteRemark,
    batchDelete,
    exportData,
    importData,
  }
}

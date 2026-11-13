<template>
  <div style="padding: 20px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2>管理员打卡汇总</h2>
      <el-button type="primary" @click="exportToExcel">导出 Excel</el-button>
    </div>

    <el-table :data="summaryData" border style="width: 100%;" :row-class-name="rowClass" v-loading="loading">
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="className" label="班级" width="150" />
      <el-table-column prop="date" label="日期" width="150" />
      <el-table-column prop="status" label="打卡状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status === '已打卡' ? 'success' : 'danger'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="temperature" label="体温" width="120" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="primary" link :disabled="row.status === '未打卡'" @click="openDetail(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 内置的详情弹窗 -->
    <el-dialog v-model="dialogVisible" title="打卡详情" width="480px">
      <el-descriptions :column="1" border v-if="currentRecord">
        <el-descriptions-item label="姓名">{{ currentRecord.name }}</el-descriptions-item>
        <el-descriptions-item label="班级">{{ currentRecord.className }}</el-descriptions-item>
        <el-descriptions-item label="日期">{{ currentRecord.date }}</el-descriptions-item>
        <el-descriptions-item label="体温">{{ currentRecord.temperature }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ currentRecord.status }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ currentRecord.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as XLSX from 'xlsx'
// 注意：如果接口还没写好，先注释掉下面两行，用假数据
import { getAllPunchesApi } from '@/api/punchApi'
import { getAllUsersApi } from '@/api/user'

const summaryData = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const currentRecord = ref(null)

const openDetail = (row) => {
  currentRecord.value = row
  dialogVisible.value = true
}

const fetchData = async () => {
  loading.value = true
  try {
    const today = new Date().toISOString().split('T')[0]
    const [usersRes, punchesRes] = await Promise.all([
      getAllUsersApi(), 
      getAllPunchesApi({ date: today }) 
    ])
    
    const users = usersRes.data || usersRes 
    const punches = punchesRes.data || punchesRes

    const punchMap = {}
    punches.forEach(p => punchMap[p.userId] = p)

    summaryData.value = users.map(user => {
      const record = punchMap[user.id]
      return {
        name: user.name,
        className: user.className,
        date: today,
        status: record ? '已打卡' : '未打卡',
        temperature: record ? record.temperature + '℃' : '-',
        remark: record ? record.remark : '-'
      }
    })
  } catch (error) {
    console.error('获取失败', error)
    // 接口没写好时的假数据兜底（保证你能看到页面）
    summaryData.value = [
      { name: '张三', className: '软件一班', date: '2023-10-01', status: '已打卡', temperature: '36.5℃', remark: '无' },
      { name: '李四', className: '软件一班', date: '2023-10-01', status: '未打卡', temperature: '-', remark: '-' }
    ]
  } finally {
    loading.value = false
  }
}

const rowClass = ({ row }) => row.status === '未打卡' ? 'warning-row' : ''

const exportToExcel = () => {
  const exportData = summaryData.value.map(item => ({
    '姓名': item.name, '班级': item.className, '日期': item.date,
    '体温': item.temperature, '状态': item.status, '备注': item.remark
  }))
  const worksheet = XLSX.utils.json_to_sheet(exportData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "打卡汇总")
  XLSX.writeFile(workbook, "全员打卡汇总表.xlsx")
}

onMounted(fetchData)
</script>

<style scoped>
:deep(.warning-row) { background-color: #fef0f0 !important; color: #f56c6c; }
</style>
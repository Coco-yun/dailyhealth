<template>
  <div style="padding: 20px;">
    <h2>系统公告</h2>
    <div v-loading="loading">
      <div v-for="item in notices" :key="item.id" style="padding: 10px; border-bottom: 1px solid #eee; margin-top: 10px;">
        <span :style="{ color: item.isTop ? 'red' : '#333', fontWeight: item.isTop ? 'bold' : 'normal', fontSize: '16px' }">
          【{{ item.isTop ? '置顶' : '公告' }}】 {{ item.title }}
        </span>
        <div style="color: #666; font-size: 14px; margin-top: 5px;">{{ item.content }}</div>
      </div>
      <el-empty v-if="notices.length === 0" description="暂无公告" />
    </div>
  </div>
</template>

<script setup>
import { getNoticesApi } from '@/api/punchApi'; // 确认实际路径
import { onMounted, ref } from 'vue'

const notices = ref([])
const loading = ref(false)

const fetchNotices = async () => {
  loading.value = true
  try {
    const res = await getNoticesApi()
    const data = res.data || res
    notices.value = data.sort((a, b) => (b.isTop ? 1 : 0) - (a.isTop ? 1 : 0))
  } catch (error) {
    console.error('获取公告失败', error)
    // 假数据兜底
    notices.value = [
      { id: 1, title: '请大家每天按时打卡！', isTop: true, content: '系统通知' },
      { id: 2, title: '系统维护通知：今晚12点停机', isTop: false, content: '运维通知' }
    ]
  } finally {
    loading.value = false
  }
}

onMounted(fetchNotices)
</script>
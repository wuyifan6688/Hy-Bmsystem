<template>
  <div class="pieChart">
    <baseChart :option="option"></baseChart>
  </div>
</template>

<script setup lang="ts">
import baseChart from './baseChart.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'

interface prop {
  value: number
  name: ''
}
interface Iprop {
  pieData: prop[]
}
const props = defineProps<Iprop>()
const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去的时候显示的文本
    tooltip: {
      trigger: 'item'
    },
    // 图例:
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pieChart {
}
</style>

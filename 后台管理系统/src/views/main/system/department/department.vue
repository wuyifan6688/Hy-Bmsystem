<template>
  <div class="user">
    <pageForm
      ref="son"
      @newMust="tryNew"
      :formConfig="refFormConfig"
    ></pageForm>
    <!-- 放在button里面会有点击确定又打开的效果,估计是事件浮动 -->
    <pageSearch
      @queryClick="searchClick"
      @resetClick="resetClick"
      :searchConfig="searchConfig"
    ></pageSearch>

    <pageContent
      @toHandleCreate="createUser"
      @toChangeUser="changeUser"
      :contentConfig="contentConfig"
      ref="contentRef"
    >
      <template #leader="scope"> {{ scope.row.leader }}</template>
      <template #top="scope"> {{ scope.row.parentId }} </template>
    </pageContent>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/pageSearch/pageSearch.vue'
import pageForm from '@/components/pageForm/pageForm.vue'
import pageContent from '@/components/pageContent/pageContent.vue'
import { reactive, ref, computed } from 'vue'
import useUserStore from '@/store/main/system'
import useMainStore from '@/store/main/main'
import dayFormat from '@/utils/dayformat'
import searchConfig from './config/searchConfig'
import contentConfig from './config/contentConfig'
import formConfig from './config/formConfig'
import { main } from '@popperjs/core'

//数据截取
const refFormConfig = computed(() => {
  const mainStore = useMainStore()
  //mainStore.togetDepartment()如果mainStore.togetDepartment()方法异步地获取了数据，那么在这个过程中，你会不断地看到控制台中输出department数组的值
  let department = mainStore.department.map((item) => {
    return { label: item.name, value: item.id }
  })
  formConfig.formItems.forEach((item) => {
    if (item.prop == 'parentId') item.options?.push(...department)
  })

  return formConfig
})

const contentRef = ref<InstanceType<typeof pageContent>>()
function searchClick(formData: any) {
  contentRef.value?.newMust(formData)
}
function resetClick() {
  contentRef.value?.newMust()
}

const son = ref<InstanceType<typeof pageForm>>()
function createUser() {
  son.value?.create(false)
}

function tryNew() {
  contentRef.value?.newMust()
}

function changeUser(messege: any) {
  son.value?.create(true, messege)
}
</script>

<style lang="less" scoped></style>

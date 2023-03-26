<template>
  <div class="user">
    <pageForm ref="son" @newMust="tryNew"></pageForm>
    <!-- 放在button里面会有点击确定又打开的效果,估计是事件浮动 -->
    <pageSearch
      @queryClick="searchClick"
      @resetClick="resetClick"
      :searchConfig="searchConfig"
    ></pageSearch>

    <pageContent
      @toHandleCreate="createUser"
      @toChangeUser="changeUser"
      ref="contentRef"
    ></pageContent>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/pageSearch/pageSearch.vue'
import pageForm from '@/components/pageForm/pageForm.vue'
import pageContent from '@/components/pageContent/pageContent.vue'
import { reactive, ref, computed } from 'vue'
import useUserStore from '@/store/main/system'
import dayFormat from '@/utils/dayformat'
import searchConfig from './config/config'

const contentRef = ref<InstanceType<typeof pageContent>>()
function searchClick(formData: any) {
  contentRef.value?.searchUser(formData)
}
function resetClick() {
  contentRef.value?.searchUser()
}

const son = ref<InstanceType<typeof pageForm>>()
function createUser() {
  son.value?.create(false)
}

function tryNew() {
  contentRef.value?.searchUser()
}

function changeUser(messege: any) {
  son.value?.create(true, messege)
}
</script>

<style lang="less" scoped></style>

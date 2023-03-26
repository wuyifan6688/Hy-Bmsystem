<template>
  <div class="userSearch">
    <div class="top">
      <el-form :model="formData" ref="formRef">
        <el-row :gutter="30">
          <template
            v-for="item in props.searchConfig!.formItems"
            :key="item.prop"
          >
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input
                  v-model="formData.name"
                  :placeholder="item.placeholder"
                /> </el-form-item></el-col
          ></template>
        </el-row>

        <div class="button">
          <el-button @click="disapper">
            <template #icon>
              <el-icon><Search /></el-icon>
            </template>
            重置</el-button
          >

          <el-button type="primary" @click="search"
            ><el-icon><Search /></el-icon>查询</el-button
          >
        </div></el-form
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { defineEmits, defineProps } from 'vue'
const formData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
//top
const emit = defineEmits(['queryClick', 'resetClick'])
function search() {
  emit('queryClick', formData)
}
const formRef = ref()
function disapper() {
  formRef.value.resetFields()
  emit('resetClick')
}

//高度封装
interface Iprops {
  searchConfig: {
    labelWidth?: string
    formItems: any[]
  }
}
const props = defineProps<Iprops>()
</script>

<style lang="less" scoped>
.userSearch {
  .top {
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    padding-top: 30px;
    .button {
      display: flex;
      justify-content: flex-end;
      .el-icon {
        margin-right: 4px;
      }
    }
  }
}
</style>

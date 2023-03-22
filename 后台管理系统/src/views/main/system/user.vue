<template>
  <div class="user">
    <div class="top">
      <el-form :model="formData" ref="formRef">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="formData.userName"
                placeholder="请输入查询的用户名"
              /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="trueName">
              <el-input
                v-model="formData.trueName"
                placeholder="请输入查询的真实姓名"
              /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="电话号码" prop="phone">
              <el-input
                v-model="formData.phone"
                placeholder="请输入查询的电话号码"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top: 20px">
          <el-col :span="8" style="margin-left: 16px">
            <el-form-item label="状态" prop="state">
              <el-select
                placeholder="请选择查询的状态"
                style="width: 94%"
                v-model="formData.state"
              >
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select> </el-form-item
          ></el-col>

          <el-col :span="8" style="margin-left: -16px">
            <el-form-item label="创建时间" prop="time"
              ><el-date-picker
                style="width: 100%"
                range-separator="-"
                start-placeholder="Start date"
                end-placeholder="End date"
                v-model="formData.time" /></el-form-item
          ></el-col>
        </el-row>
        <div class="button">
          <el-button @click="disapper"
            ><el-icon><Refresh /></el-icon>重置</el-button
          >
          <el-button type="primary"
            ><el-icon><Search /></el-icon>查询</el-button
          >
        </div></el-form
      >
    </div>

    <div class="body">
      <div class="head">
        <h2>用户列表</h2>
        <el-button type="primary">新建用户</el-button>
      </div>
      <div class="content">
        <el-table :data="list" style="width: 100%" border>
          <el-table-column align="center" type="selection" width="50%" />
          <el-table-column align="center" prop="id" label="序号" width="80%" />
          <el-table-column
            align="center"
            prop="name"
            label="用户名"
            width="80%"
          />
          <el-table-column
            align="center"
            prop="realname"
            label="真实姓名"
            width="80%"
          />
          <el-table-column
            align="center"
            prop="cellphone"
            label="手机号码"
            width="80%"
          />
          <el-table-column
            align="center"
            prop="enable"
            label="状态"
            width="80%"
          />
          <el-table-column align="center" prop="createAt" label="创建时间" />
          <el-table-column align="center" prop="updateAt" label="更新时间" />
          <el-table-column label="Operations" align="center">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                icon="Edit"
                text
                style="color: var(--el-color-primary)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                icon="Delete"
                text
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import useUserStore from '@/store/main/system'
const formData = reactive({
  userName: '',
  trueName: '',
  phone: '',
  state: 1,
  time: ''
})

const formRef = ref()
function disapper() {
  formRef.value.resetFields()
}

const userStore = useUserStore()
userStore.postUserList()

const list = computed(() => userStore.userList)
</script>

<style lang="less" scoped>
.user {
  .top {
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    .button {
      display: flex;
      justify-content: flex-end;
      .el-icon {
        margin-right: 4px;
      }
    }
  }
  .body {
    margin-top: 20px;
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    .head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
}
</style>

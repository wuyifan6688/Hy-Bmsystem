<template>
  <div class="user">
    <userForm ref="son"></userForm>
    <!-- 放在button里面会有点击确定又打开的效果,估计是事件浮动 -->
    <div class="top">
      <el-form :model="formData" ref="formRef">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入查询的用户名"
              /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="realname">
              <el-input
                v-model="formData.realname"
                placeholder="请输入查询的真实姓名"
              /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="电话号码" prop="cellphone">
              <el-input
                v-model="formData.cellphone"
                placeholder="请输入查询的电话号码"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top: 20px">
          <el-col :span="8" style="margin-left: 16px">
            <el-form-item label="状态" prop="enable">
              <el-select
                placeholder="请选择查询的状态"
                style="width: 94%"
                v-model="formData.enable"
              >
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select> </el-form-item
          ></el-col>

          <el-col :span="8" style="margin-left: -16px">
            <el-form-item label="创建时间" prop="createAt"
              ><el-date-picker
                style="width: 100%"
                range-separator="-"
                start-placeholder="Start date"
                end-placeholder="End date"
                v-model="formData.createAt" /></el-form-item
          ></el-col>
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

    <div class="body">
      <div class="head">
        <h2>用户列表</h2>
        <el-button type="primary" :ref="son" @click="createUser"
          >新建用户
        </el-button>
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
          <el-table-column align="center" prop="enable" label="状态" width="90%"
            ><template #default="scope">
              <el-button>{{
                scope.row.enable == 1 ? '启用' : '禁用'
              }}</el-button>
              <!-- 关于为什么不能直接用list.enable:list是一个对象数组，不能遍历拿值 -->
            </template></el-table-column
          >
          <el-table-column align="center" prop="createAt" label="创建时间"
            ><template #default="scope">{{
              dayFormat(scope.row.createAt)
            }}</template></el-table-column
          >

          <el-table-column align="center" prop="updateAt" label="更新时间"
            ><template #default="scope">{{
              dayFormat(scope.row.updateAt)
            }}</template></el-table-column
          >
          <el-table-column label="操作" align="center">
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
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="foot">
        <div class="demo-pagination-block">
          <div class="demonstration"></div>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import useUserStore from '@/store/main/system'
import dayFormat from '@/utils/dayformat'
import userForm from '@/views/main/system/user/cpns/userForm.vue'
const formData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

const formRef = ref()
function disapper() {
  formRef.value.resetFields()
}
let currentPage = ref(1)
let pageSize = ref(10)
const userStore = useUserStore()
userStore.postUserList((currentPage.value - 1) * pageSize.value, pageSize.value)

const list = computed(() => userStore.userList)
const totalCount = computed(() => userStore.totalCount)

//top
function search() {
  userStore.postUserList(
    (currentPage.value - 1) * pageSize.value,
    pageSize.value,
    formData.name,
    formData.realname,
    formData.cellphone ? parseInt(formData.cellphone, 10) : undefined,
    formData.enable,
    formData.createAt
  )
}

//body
function handleDelete(id: number) {
  userStore.toDeleteUser(id)
  userStore.postUserList(
    (currentPage.value - 1) * pageSize.value,
    pageSize.value
  )
}

const son = ref()
//这样写反而报错ref<InstanceType<typeof userForm>>()
function createUser() {
  son.value?.create()
}
// foot
function handleCurrentChange() {
  userStore.postUserList(
    (currentPage.value - 1) * pageSize.value,
    pageSize.value
  )
}
function handleSizeChange() {
  userStore.postUserList(
    (currentPage.value - 1) * pageSize.value,
    pageSize.value
  )
}
</script>

<style lang="less" scoped>
.user {
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
    .foot {
      margin-top: 20px;
      display: flex;
      justify-content: end;
      margin-right: 20px;
    }
  }
}
</style>

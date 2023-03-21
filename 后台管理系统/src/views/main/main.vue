<template>
  <div class="main">
    <el-container>
      <el-aside width="isFlod.value?'60px':'200px'"
        ><mainMenu :menuFold="isFold"
      /></el-aside>
      <el-container>
        <el-header
          ><mainHead @foldChange="handleFoldChange"></mainHead
        ></el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <!-- <button @click="outLogin">退出登录</button> -->
  </div>
</template>

<script setup lang="ts">
import mainMenu from './cpns/mainMenu.vue'
import mainHead from './cpns/mainHead.vue'
import { useRouter } from 'vue-router'
import { LOGIN_TOKEN } from '@/global'
import { localCache } from '@/utils/cache'
import { ref } from 'vue'
const router = useRouter()
function outLogin() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .el-container {
    .el-aside {
      background-color: rgb(239, 155, 155);
      height: 100vh;
    }
    .el-container {
      .el-header {
        background-color: bisque;
      }
      .el-main {
        background-color: rgb(240, 240, 174);
      }
    }
  }
}
</style>

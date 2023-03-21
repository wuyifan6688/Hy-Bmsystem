<template>
  <div class="mainHead">
    <div class="left" @click="handleClick">
      <el-icon size="20px"
        ><component :is="isFold ? 'Expand' : 'Fold'"></component
      ></el-icon>
      <span>面包屑</span>
    </div>

    <div class="right">
      <div class="icon">
        <span
          ><el-icon size="20px"><Message /></el-icon
        ></span>
        <span
          ><el-icon size="20px" class="dot"><ChatDotRound /></el-icon
        ></span>
        <span
          ><el-icon size="20px"><Search /></el-icon
        ></span>
      </div>
      <div class="avatar">
        <span
          ><el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        /></span>
        <el-dropdown>
          <span class="el-dropdown-link"> curry </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="outLogin">
                <el-icon><CircleClose /></el-icon>退出登录</el-dropdown-item
              >
              <el-dropdown-item
                ><el-icon><User /></el-icon>个人信息</el-dropdown-item
              >
              <!-- 我以为要用插槽，不是很会用 -->
              <el-dropdown-item
                ><el-icon><Unlock /></el-icon>修改密码</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { ref } from 'vue'
import { LOGIN_TOKEN } from '@/global'
import { localCache } from '@/utils/cache'
import router from '@/router'
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
function handleClick() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
function outLogin() {
  router.push('/login')
  localCache.removeCache(LOGIN_TOKEN)
}
</script>

<style lang="less" scoped>
.mainHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .left {
    display: flex;
    span {
      margin-left: 20px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .icon {
      span {
        margin-right: 10px;
        position: relative;
        .dot::after {
          content: '';
          display: block;
          position: absolute;
          top: -3px; /* 与图标上边缘的距离 */
          right: -3px; /* 与图标右边缘的距离 */
          width: 8px;
          height: 8px;
          background-color: red;
          border-radius: 50%; //或者前面用span，然后对span加个class
        }
      }
    }
    .avatar {
      display: flex;
      align-items: center;
      margin-left: 20px;
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>

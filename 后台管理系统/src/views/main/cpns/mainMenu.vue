<template>
  <div class="mainMenu">
    <div class="top">
      <img src="@/assets/img/mainHead.jpg" alt="" />
      <h2 v-if="!menuFold">mainMenu</h2>
    </div>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="menuFold"
    >
      <template v-for="item in menu" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id + ''">
              <!-- 控制台说index要为string -->
              <span class="run"> {{ subitem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { ref } from 'vue'
import { defineProps } from 'vue'
const loginStore = useLoginStore()
const menu = loginStore.userMenu

defineProps({
  menuFold: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.mainMenu {
  .top {
    display: flex;
    align-items: center;
    img {
      width: 64px;
    }
  }
}
.run {
  margin-left: 10px;
}
</style>

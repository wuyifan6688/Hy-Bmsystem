<template>
  <div class="home">
    <h2>111</h2>
    <router-link to="/main">home</router-link>
    <router-link to="/login">登录</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.home {
  background-color: rgb(237, 218, 218);
  height: 100vh;
}
</style>

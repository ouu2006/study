<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
router.push({ name: 'Home' })
}
</script>
<template>
<div>
<h1>Vue3 学习手册</h1>
<nav>
<router-link to="/">综合实战</router-link> |
<router-link to="/reactive">1.响应式</router-link> |
<router-link to="/directives">2.指令</router-link> |
<router-link to="/computed">3.computed</router-link> |
<router-link to="/components">4.组件</router-link> |
<router-link to="/lifecycle">5.生命周期</router-link> |
<router-link to="/router">6.路由</router-link> |
<router-link to="/pinia">7.Pinia</router-link>
</nav>
<hr />
<router-view />
<hr />
<button @click="goHome">编程式跳转到首页</button>
</div>
</template>

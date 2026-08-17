<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const goHome = () => {
router.push({ name: 'Home' })
}
const goReactive = () => {
router.push('/reactive')
}
</script>
<template>
<div>
<h2>路由演示</h2>
<p>当前路径：{{ route.path }}</p>
<nav>
<router-link to="/">首页</router-link> |
<router-link to="/about">关于</router-link> |
<router-link to="/reactive">响应式</router-link>
</nav>
<hr />
<button @click="goHome">编程式跳转到首页</button>
<button @click="goReactive">编程式跳转到响应式页</button>
</div>
</template>

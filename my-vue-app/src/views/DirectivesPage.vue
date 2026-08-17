<script setup>
import { ref } from 'vue'
const username = ref('张三')
const isOnline = ref(true)
const avatar = ref('https://via.placeholder.com/80')
const inputText = ref('')
const toggleStatus = () => {
isOnline.value = !isOnline.value
}
</script>
<template>
<div style="border:1px solid #ccc; padding:20px; width:300px">
<img :src="avatar" alt="头像" style="border-radius:50%" />
<h2>{{ username }}</h2>
<p v-if="isOnline" style="color:green">在线</p>
<p v-else style="color:gray">离线</p>
<button @click="toggleStatus">切换状态</button>
<hr />
<input v-model="inputText" placeholder="输入点什么..." />
<p>你输入的是：{{ inputText }}</p>
</div>
</template>

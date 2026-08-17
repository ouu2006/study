<script setup>
import { ref } from 'vue'
import Timer from '../components/Timer.vue'
const showTimer = ref(true)
</script>
<template>
<div>
<button @click="showTimer = !showTimer">
{{ showTimer ? '隐藏定时器' : '显示定时器' }}
</button>
<Timer v-if="showTimer" />
<p v-else>定时器已移除</p>
</div>
</template>

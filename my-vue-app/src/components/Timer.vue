<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const countdown = ref(10)
let timer = null
onMounted(() => {
console.log('Timer 组件已挂载，倒计时开始！')
timer = setInterval(() => {
countdown.value--
if (countdown.value <= 0) {
clearInterval(timer)
console.log('倒计时结束！')
}
}, 1000)
})
onUnmounted(() => {
console.log('Timer 组件已销毁，定时器已清除')
clearInterval(timer)
})
</script>
<template>
<div>
<h2>倒计时：{{ countdown }} 秒</h2>
<p v-if="countdown <= 0" style="color:red">时间到！</p>
</div>
</template>

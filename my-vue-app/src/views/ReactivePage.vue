<script setup>
import { ref, reactive } from 'vue'
const count = ref(0)
const name = ref('张三')
const user = reactive({
age: 18,
city: '北京'
})
console.log(count.value)
count.value++
console.log(user.age)
user.age = 19
</script>
<template>
<div>
<h2>Step 1：响应式数据</h2>
<p>计数：{{ count }}</p>
<p>姓名：{{ name }}</p>
<p>年龄：{{ user.age }}</p>
<p>城市：{{ user.city }}</p>
</div>
</template>

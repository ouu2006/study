<script setup>
defineProps({
name: String,
price: Number,
isHot: Boolean
})
const emit = defineEmits(['add-to-cart'])
const handleAdd = () => {
emit('add-to-cart')
}
</script>
<template>
<div style="border:1px solid #ddd; padding:15px; margin:10px">
<span v-if="isHot" style="color:red">热门</span>
<h3>{{ name }}</h3>
<p>¥{{ price }}</p>
<button @click="handleAdd">加入购物车</button>
</div>
</template>

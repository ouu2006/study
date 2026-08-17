<script setup>
const props = defineProps({
todo: Object
})
const emit = defineEmits(['toggle', 'delete'])
const handleToggle = () => emit('toggle', props.todo.id)
const handleDelete = () => emit('delete', props.todo.id)
</script>
<template>
<li :class="{ completed: todo.done }">
<input type="checkbox" :checked="todo.done" @change="handleToggle" />
<span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">{{ todo.text }}</span>
<button @click="handleDelete" style="margin-left:auto">删除</button>
</li>
</template>
<style scoped>
li {
display: flex;
align-items: center;
gap: 10px;
padding: 8px;
border-bottom: 1px solid #eee;
}
.completed span {
color: #999;
}
</style>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import TodoItem from '../components/TodoItem.vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../stores/todo'
const todoStore = useTodoStore()
const { todos, newTodo, total, completed, incomplete } = storeToRefs(todoStore)
const { addTodo, toggleTodo, deleteTodo } = todoStore
onMounted(() => {
console.log('Todo List 已加载，共', total.value, '项')
})
</script>
<template>
<div style="max-width:500px; margin:0 auto">
<h1>Todo List</h1>
<div style="display:flex; gap:10px">
<input v-model="newTodo" @keyup.enter="addTodo" placeholder="输入待办事项..." style="flex:1; padding:8px" />
<button @click="addTodo" style="padding:8px 16px">添加</button>
</div>
<p>
总计：<strong>{{ total }}</strong> |
已完成：<strong style="color:green">{{ completed }}</strong> |
未完成：<strong style="color:red">{{ incomplete }}</strong>
</p>
<ul v-if="todos.length > 0" style="list-style:none; padding:0">
<TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggle="toggleTodo" @delete="deleteTodo" />
</ul>
<p v-else style="color:#999">暂无待办事项，添加一个吧！</p>
</div>
</template>

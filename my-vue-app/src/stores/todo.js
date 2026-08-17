import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
export const useTodoStore = defineStore('todo', () => {
const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'))
const newTodo = ref('')
const total = computed(() => todos.value.length)
const completed = computed(() => todos.value.filter(t => t.done).length)
const incomplete = computed(() => total.value - completed.value)
function addTodo() {
const text = newTodo.value.trim()
if (!text) return
todos.value.push({
id: Date.now(),
text,
done: false
})
newTodo.value = ''
}
function toggleTodo(id) {
const todo = todos.value.find(t => t.id === id)
if (todo) todo.done = !todo.done
}
function deleteTodo(id) {
todos.value = todos.value.filter(t => t.id !== id)
}
watch(todos, (val) => {
localStorage.setItem('todos', JSON.stringify(val))
}, { deep: true })
return { todos, newTodo, total, completed, incomplete, addTodo, toggleTodo, deleteTodo }
})

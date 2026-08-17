import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
const items = ref([])
const total = computed(() => {
return items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
})
const count = computed(() => {
return items.value.reduce((sum, item) => sum + item.qty, 0)
})
function addItem(product) {
const existing = items.value.find(i => i.id === product.id)
if (existing) {
existing.qty++
} else {
items.value.push({ ...product, qty: 1 })
}
}
function removeItem(id) {
items.value = items.value.filter(i => i.id !== id)
}
return { items, total, count, addItem, removeItem }
})

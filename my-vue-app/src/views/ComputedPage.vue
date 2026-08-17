<script setup>
import { ref, computed, watch } from 'vue'
const price = ref(29.9)
const quantity = ref(1)
const total = computed(() => {
return (price.value * quantity.value).toFixed(2)
})
const discountTotal = computed(() => {
if (quantity.value >= 3) {
return (total.value * 0.8).toFixed(2)
}
return total.value
})
watch(quantity, (newVal) => {
if (newVal > 10) {
alert('数量已达上限，最多 10 件！')
quantity.value = 10
}
})
const increase = () => quantity.value++
const decrease = () => {
if (quantity.value > 1) quantity.value--
}
</script>
<template>
<div>
<h2>购物车</h2>
<p>单价：¥{{ price }}</p>
<p>
数量：
<button @click="decrease">-</button>
{{ quantity }}
<button @click="increase">+</button>
</p>
<p>小计：¥{{ total }}</p>
<p v-if="quantity >= 3" style="color:red">
满 3 件 8 折优惠！折后价：¥{{ discountTotal }}
</p>
</div>
</template>

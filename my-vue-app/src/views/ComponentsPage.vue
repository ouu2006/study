<script setup>
import { ref } from 'vue'
import ProductItem from '../components/ProductItem.vue'
const cart = ref([])
const products = [
{ name: 'Vue3 实战教程', price: 59.9, isHot: true },
{ name: 'JavaScript 高级', price: 39.9, isHot: false }
]
const addToCart = (product) => {
cart.value.push(product)
alert(`${product.name} 已加入购物车！当前共 ${cart.value.length} 件`)
}
</script>
<template>
<div>
<h2>商品列表</h2>
<ProductItem
v-for="(item, index) in products"
:key="index"
:name="item.name"
:price="item.price"
:is-hot="item.isHot"
@add-to-cart="addToCart(item)"
/>
<hr />
<h3>购物车 ({{ cart.length }})</h3>
<ul>
<li v-for="(item, index) in cart" :key="index">{{ item.name }}</li>
</ul>
</div>
</template>

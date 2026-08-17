<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'
const userStore = useUserStore()
const cartStore = useCartStore()
const { name, isLoggedIn } = storeToRefs(userStore)
const { count, total } = storeToRefs(cartStore)
</script>
<template>
<div>
<h2>用户：{{ name }}</h2>
<p v-if="!isLoggedIn">
<button @click="userStore.login('小明')">登录</button>
</p>
<p v-else>
<button @click="userStore.logout()">退出登录</button>
</p>
<hr />
<h3>购物车 ({{ count }} 件商品)</h3>
<p v-if="count > 0">合计：¥{{ total.toFixed(2) }}</p>
<button @click="cartStore.addItem({ id: 1, name: 'Vue3 书本', price: 59.9 })">添加书本</button>
</div>
</template>

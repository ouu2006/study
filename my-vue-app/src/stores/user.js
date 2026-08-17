import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
const name = ref('未登录用户')
const isLoggedIn = ref(false)
function login(username) {
name.value = username
isLoggedIn.value = true
}
function logout() {
name.value = '未登录用户'
isLoggedIn.value = false
}
return { name, isLoggedIn, login, logout }
})

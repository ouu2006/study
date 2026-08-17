import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import ReactivePage from '../views/ReactivePage.vue'
import DirectivesPage from '../views/DirectivesPage.vue'
import ComputedPage from '../views/ComputedPage.vue'
import ComponentsPage from '../views/ComponentsPage.vue'
import LifecyclePage from '../views/LifecyclePage.vue'
import RouterPage from '../views/RouterPage.vue'
import PiniaPage from '../views/PiniaPage.vue'
const routes = [
{ path: '/', name: 'Home', component: Home },
{ path: '/reactive', name: 'Reactive', component: ReactivePage },
{ path: '/directives', name: 'Directives', component: DirectivesPage },
{ path: '/computed', name: 'Computed', component: ComputedPage },
{ path: '/components', name: 'Components', component: ComponentsPage },
{ path: '/lifecycle', name: 'Lifecycle', component: LifecyclePage },
{ path: '/router', name: 'Router', component: RouterPage },
{ path: '/pinia', name: 'Pinia', component: PiniaPage }
]
const router = createRouter({
history: createWebHistory(),
routes
})
export default router

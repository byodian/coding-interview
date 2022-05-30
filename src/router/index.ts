import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useFilterStore } from '@/stores/index'
import { getItem } from '@/utils/localstorage'
import { isDef } from '@/utils/common'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

router.beforeEach(() => {
  const store = useFilterStore()
  if (isDef(getItem('garage'))) {
    store.setGarage(getItem('garage'))
  }

  if (isDef(getItem('bathroom'))) {
    store.setBathroom(getItem('bathroom'))
  }

  if (isDef(getItem('bedrooms'))) {
    store.setBedRooms(getItem('bedrooms'))
  }

  if (isDef(getItem('keyword'))) {
    store.setKeyword(getItem('keyword'))
  }
})

export default router

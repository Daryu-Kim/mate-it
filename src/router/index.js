import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LiveChannelView from '@/views/LiveChannelView.vue'
import TodayView from '@/views/TodayView.vue'
import SecretView from '@/views/SecretView.vue'
import Broadcaster from '@/views/Broadcaster.vue'
import Viewer from '@/views/Viewer.vue'
import ReadyVideoBroadcast from '@/views/ReadyVideoBroadcast.vue'
import ReadyAudioBroadcast from '@/views/ReadyAudioBroadcast.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/today',
    name: 'today',
    component: TodayView
  },
  {
    path: '/live-channel',
    name: 'live-channel',
    component: LiveChannelView
  },
  {
    path: '/secret',
    name: 'secret',
    component: SecretView
  },
  {
    path: '/ready-audio-broadcaster',
    name: 'ready-audio-broadcaster',
    component: ReadyAudioBroadcast
  },
  {
    path: '/ready-video-broadcaster',
    name: 'ready-video-broadcaster',
    component: ReadyVideoBroadcast
  },
  {
    path: '/broadcaster',
    name: 'broadcaster',
    component: Broadcaster
  },
  {
    path: '/viewer',
    name: 'viewer',
    component: Viewer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

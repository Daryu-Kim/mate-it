import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LiveChannelView from '@/views/LiveChannelView.vue'
import SecretView from '@/views/SecretView.vue'
import Broadcaster from '@/views/Broadcaster.vue'
import Viewer from '@/views/Viewer.vue'
import ReadyVideoBroadcast from '@/views/ReadyVideoBroadcast.vue'
import ReadyAudioBroadcast from '@/views/ReadyAudioBroadcast.vue'
import { getCurrentSession } from '@/lib/supabase'
import NotFoundView from '@/views/NotFoundView.vue'
import SignupView from '@/views/SignupView.vue'
import SecretDetailView from '@/views/SecretDetailView.vue'
import SecretAddView from '@/views/SecretAddView.vue'
import ChatListView from '@/views/ChatListView.vue'
import ChatMessageView from '@/views/ChatMessageView.vue'
import ProfileView from '@/views/ProfileView.vue'
import MyPageView from '@/views/MyPageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat-list',
    name: 'chat-list',
    component: ChatListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatMessageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/live-channel',
    name: 'live-channel',
    component: LiveChannelView,
    meta: { requiresAuth: true }
  },
  {
    path: '/secret',
    name: 'secret',
    component: SecretView,
    meta: { requiresAuth: true }
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/secret-detail',
    name: 'secret-detail',
    component: SecretDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/secret-add',
    name: 'secret-add',
    component: SecretAddView,
    meta: { requiresAuth: true }
  },
  {
    path: '/ready-audio-broadcaster',
    name: 'ready-audio-broadcaster',
    component: ReadyAudioBroadcast,
    meta: { requiresAuth: true }
  },
  {
    path: '/ready-video-broadcaster',
    name: 'ready-video-broadcaster',
    component: ReadyVideoBroadcast,
    meta: { requiresAuth: true }
  },
  {
    path: '/broadcaster',
    name: 'broadcaster',
    component: Broadcaster,
    meta: { requiresAuth: true }
  },
  {
    path: '/viewer',
    name: 'viewer',
    component: Viewer,
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const session = await getCurrentSession();
    if (!session) {
      return next({ name: 'home' });
    }
  }
  return next();
})

export default router

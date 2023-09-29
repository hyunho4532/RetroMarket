import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: "/used/trade",
        name: 'UsedTrade',
        component: () => import('@/views/UsedTrade.vue'),
    },
];

const router = createRouter({
    mode: 'history',
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
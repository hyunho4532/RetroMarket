import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import UsedTrade from "./views/UsedTrade.vue";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/used/trade",
        component: UsedTrade,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

const routerHistory = createWebHashHistory();

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@comp/Home.vue'),
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import('@comp/Home.vue'),
                meta: {
                    keepAlive: false
                }
            }
        ]

    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@comp/About.vue')

    }
];
const router = createRouter({
    history: routerHistory,
    routes
});

export default router;
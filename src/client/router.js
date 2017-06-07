import Vue from 'vue';
import VueRouter from 'vue-router';

import event from './utils/event.js'

import Home from './component/content/Home.vue'
import AdminUsers from './component/content/admin/Users.vue'
import AdminGroups from './component/content/admin/Groups.vue'
import Contact from './component/content/Contact.vue'
import Sample from './component/content/Sample.vue'
import ErrorUnknown from './component/content/Error.vue'
import Error404 from './component/content/Error404.vue'

Vue.use(VueRouter)

const homeRoute = { 
    name : 'home',
    path: '/home', 
    component: Home 
}

const router = new VueRouter({
    mode    : 'history',
    base    : '',
    routes  : [
        homeRoute,
        { 
            name : 'admin-users',
            path: '/admin/users', 
            component: AdminUsers
        },{ 
            name : 'admin-groups',
            path: '/admin/groups', 
            component: AdminGroups 
        },{ 
            name : 'contact',
            path: '/contact', 
            component: Contact 
        },{ 
            name : 'sample',
            path: '/sample', 
            component: Sample 
        },{ 
            name : 'error',
            path: '/error', 
            component: ErrorUnknown 
        },{ 
            name : 'error-404',
            path: '/error-404', 
            component: Error404 
        }
    ]
})

// redirect on home page when user logout and was on an admin page
event.on(event.LOGOUT, () => {
    if (router.currentRoute.path && router.currentRoute.path.startsWith('/admin/'))
        router.push(homeRoute)
})

export default router
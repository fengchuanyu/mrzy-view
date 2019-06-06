import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '欢迎页面', icon: 'example', affix: true }
      }
    ]
  }
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: false,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/doctor',
    component: Layout,
    redirect: '/doctor/list',
    alwaysShow: true,
    name: '医生管理',
    meta: {
      title: '医生',
      icon: 'peoples',
      roles: ['admin', 'doctor']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/mrzy-doctor/list'),
        name: 'doctorlist',
        meta: { title: '医生列表' }
      },
      {
        path: 'add',
        component: () => import('@/views/mrzy-doctor/add'),
        name: 'add',
        meta: { title: '添加医生' },
        hidden: true
      }
    ]
  },
  {
    path: '/muser',
    component: Layout,
    redirect: '/muser/list',
    alwaysShow: true,
    name: '用户管理',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['admin']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/mrzy-user/list'),
        name: 'muserlist',
        meta: { title: '用户列表' }
      }
    ]
  },
  {
    path: '/office',
    component: Layout,
    redirect: '/office/list',
    alwaysShow: true,
    name: '科室管理',
    meta: {
      title: '科室管理',
      icon: 'tree',
      roles: ['admin']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/mrzy-office/list'),
        name: 'list',
        meta: { title: '科室列表' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/articlelist',
    alwaysShow: true,
    name: '文章管理',
    meta: {
      title: '文章管理',
      icon: 'edit',
      roles: ['admin']
    },
    children: [
      {
        path: 'articlelist',
        component: () => import('@/views/mrzy-article/list'),
        name: 'articlelist',
        meta: { title: '文章列表' }
      },
      {
        path: 'articleadd',
        component: () => import('@/views/mrzy-article/add'),
        name: 'articleadd',
        meta: { title: '发布文章' }
      }
    ]
  },
  {
    path: '/appointment',
    component: Layout,
    redirect: '/appointment/list',
    alwaysShow: true,
    name: '挂号管理',
    meta: {
      title: '挂号管理',
      icon: 'tab',
      roles: ['admin']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/mrzy-appointment/list'),
        name: 'appointmentlist',
        meta: { title: '挂号列表' }
      },
      {
        path: 'case',
        component: () => import('@/views/mrzy-appointment/case'),
        name: 'case',
        meta: { title: '病例列表' }
      },
      {
        path: 'casedetail',
        component: () => import('@/views/mrzy-appointment/case-detail'),
        name: 'casedetail',
        meta: { title: '病例详情' },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   hidden: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


import Admin from '@/views/Admin/Admin.vue';

import DashBoard from '@/views/Admin/DashBoard.vue';

export default [
    {
        path: '/Admin',
        name: 'Admin',
        component: Admin,
        children : [
         {
          path: 'dashboard',
          name: 'DashBoard',
          component: () => import("@/views/Admin/DashBoard.vue"),
         }
        ]
      },
]
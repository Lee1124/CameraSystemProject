import homePage from '@/components/homePage/homePage';
import Calender from '@/components/homePage/calendar/calendar';
import demoPage from '@/components/demoPage/demoPage';
import orderManage from '@/components/orderManage/orderManage';
import orderManageOurShop from '@/components/orderManage/orderManage-ourShop/orderManage-ourShop';
import setting from '@/components/setting/settingHome';

export default [
  {
    path: '/homePage',
    name: 'homePage',
    component: homePage,
    children: [
      {
        path: '/',
        name: 'Calender',
        component: Calender,
      },
      {
        path: '/demoPage',
        name: 'demoPage',
        component: demoPage,
      },
      {
        path: '/personal',
        name: 'personal',
        component: setting,
      },
      {
        path: '/orderManage',
        name: 'orderManage',
        component: orderManage,
        children: [
          {
            path: '/',
            name: 'orderManageOurShop',
            component: orderManageOurShop,
          }
        ]
      }
    ]
  }
]

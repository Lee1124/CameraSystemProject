import homePage from '@/components/homePage/homePage';
import Calender from '@/components/calendar/calendar';
import deviceHome from '@/components/device/deviceHome';
import deviceList from '@/components/device/pages/deviceList';
import maintainView from '@/components/device/pages/maintainView';
import outgoingList from '@/components/device/pages/outgoingList';
import statisticalView from '@/components/device/pages/statisticalView';
import orderManage from '@/components/orderManage/orderManage';
import orderManageOurShop from '@/components/orderManage/pages/orderManage-ourShop';
import orderManageWillRepayOrder from '@/components/orderManage/pages/orderManage-willRepayOrder';
import intentionTable from '@/components/orderManage/pages/orderDetails-intentionTable';
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
        path: '/deviceHome',
        name: 'deviceHome',
        component: deviceHome,
        redirect: '/deviceHome/device',
        children: [
          {
            path: 'device',
            component: deviceList,
          },
          {
            path: 'outgoing',
            component: outgoingList,
          },
          {
            path: 'maintain',
            component: maintainView,
          },
          {
            path: 'statistical',
            component: statisticalView,
          }
        ]
      },
      {
        path: '/caiwu',
        name: 'caiwu',
        component: resolve => require(['@/components/caiwu/caiwu'], resolve)
      },
      {
        path: '/settingHome',
        name: 'settingHome',
        component: setting,
      },
      {
        path: '/orderManage',
        name: 'orderManage',
        component: orderManage,
        redirect: '/orderManage/orderManageOurShop',
        children: [
          {
            path: 'orderManageOurShop',
            component: orderManageOurShop,
          },
          {
            path: 'orderManageWillRepayOrder',
            component: orderManageWillRepayOrder,
          },
        ]
      }
    ]
  },
  {
    path: '/intentionTable',
    component: intentionTable,
  },//客户意向表
]

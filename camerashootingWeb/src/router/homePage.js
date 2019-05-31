import homePage from '@/components/homePage/homePage';
import Calender from '@/components/homePage/calendar/calendar';
import demoPage from '@/components/demoPage/demoPage';

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
    ]
  }
]

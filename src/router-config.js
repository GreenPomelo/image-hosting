// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import QyLogin from './pages/login';
import QyUpload from './pages/upload';
import QyList from './pages/list';

const routerConfig = [
  {
    path: '/user/login',
    component: QyLogin
  },
  {
    path: '/user/upload',
    component: QyUpload
  },
  {
    path: '/user/list',
    component: QyList
  }
];

export default routerConfig;

import QyLogin from './pages/login';
import QyUpload from './pages/upload';
import QyList from './pages/list';
import QyUserList from './pages/userList';

const routerConfig = [
  {
    path: '/login',
    component: QyLogin,
    name: '登录'
  },
  {
    path: '/upload',
    component: QyUpload,
    name: '上传'
  },
  {
    path: '/list',
    component: QyList,
    name: '上传历史'
  },
  {
    path: '/user-list',
    component: QyUserList,
    name: '用户列表'
  }
];

export default routerConfig;

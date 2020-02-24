import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import routerData from '../router-config';
import '../style/navigate.sass';
import 'antd/dist/antd.css';
import QyLogin from '../pages/login';

const { Header, Footer } = Layout;

class Navigator extends React.Component {
  render() {
    const { location, isLogin } = this.props;
    const routerDisplay = isLogin
      ? routerData
      : [
          {
            path: '/login',
            component: QyLogin,
            name: '登录'
          }
        ];
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              defaultSelectedKeys={['3']}
              style={{ lineHeight: '64px' }}
            >
              {routerDisplay.map(item =>
                item.component ? (
                  <Menu.Item key={item.path}>
                    <Link to={item.path}>{item.name}</Link>
                  </Menu.Item>
                ) : null
              )}
            </Menu>
          </Header>
          <Switch>
            {routerDisplay.map((item, index) =>
              item.component ? (
                <Route
                  key={index}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ) : null
            )}
            <Redirect exact to="/login" />
          </Switch>
          <Footer style={{ textAlign: 'center' }}>
            CopyRight @2017-{new Date().getFullYear()} 青柚工作室 qingyou.njupt.edu.cn
          </Footer>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state.userReducer });

export default connect(mapStateToProps)(Navigator);

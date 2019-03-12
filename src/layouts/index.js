import React from 'react';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routerData from '../router-config';
import '../style/navigate.sass';
import 'antd/dist/antd.css';

const { Header, Footer } = Layout;

const UserComponent = withRouter(props => {
  const { location } = props;
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
            {routerData.map(item =>
              item.component ? (
                <Menu.Item key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
              ) : null
            )}
          </Menu>
        </Header>
        <Switch>
          {routerData.map((item, index) =>
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
          CopyRight @2017-2019 青柚工作室 qingyou.njupt.edu.cn
        </Footer>
      </Layout>
    </div>
  );
});

export default UserComponent;

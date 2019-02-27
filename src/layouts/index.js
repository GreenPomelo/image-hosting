import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routerData from '../router-config';
import '../style/navigate.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;
export default class UserComponent extends Component {
  constructor() {
    super();
    this.state = {
      navBarKey: ['3']
    };
  }

  render() {
    const { navBarKey } = this.state;
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={navBarKey}
              style={{ lineHeight: '64px' }}
            >
              {routerData.map((item, index) =>
                item.component ? (
                  <Menu.Item key={index}>
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
          <Content />
          <Footer style={{ textAlign: 'center' }}>
            CopyRight @2017-2019 青柚工作室 qingyou.njupt.edu.cn
          </Footer>
        </Layout>
      </div>
    );
  }
}

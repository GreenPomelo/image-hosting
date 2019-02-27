import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import UserComponent from './layouts/index';

// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
const router = () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={UserComponent} />
      {/* <Route path="/" component={BasicLayout} /> */}
    </Switch>
  </HashRouter>
);

class App extends Component {
  render() {
    return <div className="App">{router()}</div>;
  }
}

export default App;

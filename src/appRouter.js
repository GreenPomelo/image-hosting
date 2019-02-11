import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import QyLogin from './views/login';
import QyUpload from './views/upload';
import QyList from './views/list';
import './style/navigate.css';

const { Header, Content, Footer } = Layout;

export default class AppRouter extends Component {
  constructor() {
    super();
    this.state = {
      navBarKey: ['3']
    };
  }

  componentDidMount() {
    this.LoginStatus();
  }

  LoginStatus = () => {
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
      this.setState({ navBarKey: ['1'] });
      return <Redirect to="/upload" />;
    }
    return <Redirect to="/" />;
  };

  render() {
    const { navBarKey } = this.state;
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={navBarKey}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link to="/upload">上传</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/list">上传列表</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/">登录</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content />
          <Switch>
            <Route path="/" exact component={QyLogin} />
            <Route path="/upload/" component={QyUpload} />
            <Route path="/list/" component={QyList} />
          </Switch>
          <Footer style={{ textAlign: 'center' }}>
            CopyRight @2017-2019 青柚工作室 qingyou.njupt.edu.cn
          </Footer>
        </Layout>
      </Router>
    );
  }
}

// ////////////////////////////////////////////////////////////
// // 1. Click the public page
// // 2. Click the protected page
// // 3. Log in
// // 4. Click the back button, note the URL each time

// function AuthExample() {
//   return (
//     <Router>
//       <div>
//         <AuthButton />
//         <ul>
//           <li>
//             <Link to="/public">Public Page</Link>
//           </li>
//           <li>
//             <Link to="/protected">Protected Page</Link>
//           </li>
//         </ul>
//         <Route path="/public" component={Public} />
//         <Route path="/login" component={Login} />
//         <PrivateRoute path="/protected" component={Protected} />
//       </div>
//     </Router>
//   );
// }

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// const AuthButton = withRouter(
//   ({ history }) =>
//     fakeAuth.isAuthenticated ? (
//       <p>
//         Welcome!{" "}
//         <button
//           onClick={() => {
//             fakeAuth.signout(() => history.push("/"));
//           }}
//         >
//           Sign out
//         </button>
//       </p>
//     ) : (
//       <p>You are not logged in.</p>
//     )
// );

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         fakeAuth.isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

// function Public() {
//   return <h3>Public</h3>;
// }

// function Protected() {
//   return <h3>Protected</h3>;
// }

// class Login extends React.Component {
//   state = { redirectToReferrer: false };

//   login = () => {
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true });
//     });
//   };

//   render() {
//     let { from } = this.props.location.state || { from: { pathname: "/" } };
//     let { redirectToReferrer } = this.state;

//     if (redirectToReferrer) return <Redirect to={from} />;

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     );
//   }
// }

// export default AuthExample;

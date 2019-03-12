import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import logo from '../assets/qingyoulogo.svg';
import QyAlert from '../components/alert';
import {
  loginRequest,
  logOutRequest,
  checkLogin,
  userNameInput,
  passWordInput
} from '../actions/user';
import loginSaga from '../saga/user';

const FormItem = Form.Item;
const styleComponent = {
  LoginContainer: {
    display: 'flex',
    width: '100vw',
    height: 'calc(100vh - 133px)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  LogoContainer: {
    marginTop: '20vh',
    marginBottom: '64px'
  },
  LoginForm: {
    width: '300px'
  },
  LoginFormButton: {
    width: '100%'
  }
};
class NormalLoginForm extends React.Component {
  componentDidMount() {
    const loginStatus = !!localStorage.getItem('cookie');
    this.props.checkLogin(loginStatus);
  }

  handleUsername = ({ target: { value: username } }) => {
    this.props.userNameInput(username);
  };

  handlePassword = ({ target: { value: password } }) => {
    this.props.passWordInput(password);
  };

  handleSubmit = e => {
    const { username, password } = this.props;
    this.props.loginRequest(username, password);
    // this.props.loginSaga(username, password);
    e.preventDefault();
  };

  /**
   * 退出登录
   */
  logOutPress = () => {
    this.props.logOutRequest();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin, loginError } = this.props;
    return (
      <div style={styleComponent.LoginContainer}>
        <QyAlert error={loginError} />
        <div style={styleComponent.LogoContainer}>
          <img src={logo} alt="" />
        </div>
        {isLogin ? (
          <div style={styleComponent}>
            <Button type="primary" size="large" onClick={this.logOutPress}>
              退出登录
            </Button>
          </div>
        ) : (
          <Form onSubmit={this.handleSubmit} style={styleComponent.LoginForm}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  onChange={this.handleUsername}
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                  { passwordWrong: false, message: '密码错误' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  onChange={this.handlePassword}
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={styleComponent.LoginFormButton}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state.userReducer });
const mapDispatchToProps = dispatch => ({
  userNameInput: (...args) => dispatch(userNameInput(...args)),
  passWordInput: (...args) => dispatch(passWordInput(...args)),
  loginRequest: (...args) => dispatch(loginRequest(...args)),
  loginSaga: (...args) => dispatch(loginSaga(...args)),
  logOutRequest: (...args) => dispatch(logOutRequest(...args)),
  checkLogin: (...args) => dispatch(checkLogin(...args))
});

const QyLogin = Form.create()(NormalLoginForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QyLogin);

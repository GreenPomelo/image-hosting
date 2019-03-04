import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import logo from '../assets/qingyoulogo.svg';
import QyAlert from '../components/alert';
import { userLogout } from '../api/user';
import { loginRequest } from '../actions/user';
import loginSaga from '../saga/user';

const FormItem = Form.Item;
const styleComponent = {
  LoginContainer: {
    display: 'flex',
    width: '100vw',
    height: '100%',
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
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsername = ({ target: { value: username } }) => {
    this.setState({ username });
  };

  handlePassword = ({ target: { value: password } }) => {
    this.setState({ password });
  };

  handleSubmit = e => {
    const { username, password } = this.state;
    this.props.loginRequest(username, password);
    // this.props.loginSaga(username, password);
    e.preventDefault();
  };

  /**
   * 退出登录
   */
  logOutPress = () => {
    userLogout().then(() => {
      localStorage.clear();
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin, error } = this.props;
    return (
      <div style={styleComponent.LoginContainer}>
        <QyAlert error={error} />
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
                  placeholder="Username"
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
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={styleComponent.LoginFormButton}
              >
                Log in
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
  loginRequest: (...args) => dispatch(loginRequest(...args)),
  loginSaga: (...args) => dispatch(loginSaga(...args))
});

const QyLogin = Form.create()(NormalLoginForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QyLogin);

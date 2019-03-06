import React from 'react';
import { List, Avatar, Button } from 'antd';
import { connect } from 'react-redux';
import PopForm from '../components/popForm';
import QyAlert from '../components/alert';
import {
  userListRequest,
  addUserRequest,
  deleteUserRequest
} from '../actions/userlist';

const styleSheet = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  LoginForm: {
    width: '300px'
  },
  LoginFormButton: {
    width: '100%'
  }
};

class QyUserList extends React.Component {
  state = {
    visible: false
  };

  componentDidMount() {
    this.props.userListRequest();
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.addUserRequest(values.studentId, values.password);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  deleteUser = (item, e) => {
    e.preventDefault();
    this.props.deleteUserRequest(item.studentId);
  };

  render() {
    const { list, userError } = this.props;
    return (
      <div style={styleSheet.container}>
        <QyAlert error={userError} />
        <List
          itemLayout="horizontal"
          dataSource={list}
          locale={{ emptyText: '暂无数据' }}
          renderItem={item => (
            <List.Item
              actions={[
                <a
                  onClick={e => {
                    this.deleteUser(item, e);
                  }}
                >
                  删除
                </a>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://static.airbob.org/auth/logo-small.png" />
                }
                title={<a href="https://ant.design">{item.studentId}</a>}
                description={item.root ? '管理员' : '普通用户'}
              />
            </List.Item>
          )}
        />
        <Button type="primary" icon="team" onClick={this.showModal}>
          添加用户
        </Button>
        <PopForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.userListReducer });

const mapDispatchToProps = dispatch => ({
  userListRequest: () => dispatch(userListRequest()),
  addUserRequest: (...args) => dispatch(addUserRequest(...args)),
  deleteUserRequest: (...args) => dispatch(deleteUserRequest(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QyUserList);

import React from 'react';
import { Input, Modal, Form } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="添加用户"
          okText="添加"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="账号">
              {getFieldDecorator('studentId', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password')(<Input type="password" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default CollectionCreateForm;

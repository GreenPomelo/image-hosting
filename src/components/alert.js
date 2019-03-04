import React, { Component } from 'react';
import { notification, Icon } from 'antd';

export default class QyAlert extends Component {
  render() {
    const { error } = this.props;
    if (error) {
      notification.open({
        message: '通知消息🍋',
        description: error,
        duration: 6,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />
      });
    }
    return null;
  }
}

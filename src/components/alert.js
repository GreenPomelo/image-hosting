import React, { PureComponent } from 'react';
import { notification, Icon } from 'antd';

export default class QyAlert extends PureComponent {
  notification = error => {
    notification.open({
      message: '通知消息🍋',
      description: error,
      duration: 6,
      icon: <Icon type="bulb" style={{ color: '#108ee9' }} />
    });
  };

  render() {
    const { error } = this.props;
    if (error) {
      this.notification(error);
    }
    return <div />;
  }
}

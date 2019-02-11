import React, { Component } from 'react';
import { Alert } from 'antd';

const onClose = e => {
  console.log(e, 'I was closed.');
};

export default class QyAlert extends Component {
  static defaultProps = {
    errMsg: '发生了某些错误'
  };

  render() {
    const { errMsg } = this.props;
    return (
      <div>
        <Alert
          message="错误信息"
          description={errMsg}
          type="error"
          closable
          onClose={onClose}
        />
      </div>
    );
  }
}

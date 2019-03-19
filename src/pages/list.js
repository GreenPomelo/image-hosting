import React from 'react';
import { List, notification, Icon } from 'antd';
import '../style/list.sass';
import { connect } from 'react-redux';
import QyAlert from '../components/alert';
import { listRequest } from '../actions/list';

class QyList extends React.Component {
  componentDidMount() {
    const ZERO = 0;
    this.getHistoryList(ZERO);
  }

  getHistoryList = page => {
    const TWENTY = 20;
    this.props.listRequest(page, TWENTY);
  };

  copyPic = (item, e) => {
    e.preventDefault();
    navigator.clipboard.writeText(item.picUrl).then(() => {
      notification.open({
        message: '通知消息🍋',
        description: `粘贴成功`,
        duration: 6,
        icon: <Icon type="bulb" style={{ color: '#108ee9' }} />
      });
    });
  };

  formatTime = timeStamp => {
    const date = new Date(timeStamp);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  render() {
    const { historyError, historyList, totalList } = this.props;
    return (
      <div className="list-container">
        <QyAlert error={historyError} />
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              this.getHistoryList(page - 1);
            },
            defaultCurrent: 1,
            total: totalList
          }}
          dataSource={historyList}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={<img width={272} alt="logo" src={item.picUrl} />}
            >
              <List.Item.Meta
                title={
                  <a
                    onClick={e => {
                      this.copyPic(item, e);
                    }}
                  >
                    复制链接
                  </a>
                }
                description={`上传时间：${this.formatTime(item.createTime)}`}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state.historyReducer });
const mapDispatchToProps = dispatch => ({
  listRequest: (...args) => dispatch(listRequest(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QyList);

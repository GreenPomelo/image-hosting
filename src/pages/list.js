import React from 'react';
import { List, Avatar } from 'antd';
import '../style/list.sass';
import { connect } from 'react-redux';
import QyAlert from '../components/alert';
import { listRequest } from '../actions/list';

class QyList extends React.Component {
  componentDidMount() {
    this.getHistoryList();
  }

  getHistoryList = () => {
    const ONE = 1;
    const TWENTY = 20;
    this.props.listRequest(ONE, TWENTY);
  };

  render() {
    const { historyError, historyList } = this.props;
    return (
      <div className="list-container">
        <QyAlert error={historyError} />
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3
          }}
          dataSource={historyList.content}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
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

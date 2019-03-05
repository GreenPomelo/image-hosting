import React from 'react';
import { List, Avatar, Button, Skeleton, Pagination } from 'antd';
import '../style/list.sass';
import { connect } from 'react-redux';
import QyAlert from '../components/alert';
import { listRequest } from '../actions/list';

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <div>Previous</div>;
  }
  if (type === 'next') {
    return <div>Next</div>;
  }
  return originalElement;
}

const count = 3;

class QyList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: []
  };

  componentDidMount() {
    this.getHistoryList();
  }

  getHistoryList = () => {
    const ONE = 1;
    const TWENTY = 20;
    this.props.listRequest(ONE, TWENTY);
  };

  onLoadMore = () => {
    const { data } = this.state;
    this.setState({
      loading: true,
      list: data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} }))
      )
    });
    this.getHistoryList(res => {
      const dataNew = data.concat(res.results);
      this.setState(
        {
          data: dataNew,
          list: dataNew,
          loading: false
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        }
      );
    });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px'
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;
    const { error } = this.props;
    return (
      <div className="list-container">
        <QyAlert error={error} />
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<div>edit</div>, <div>more</div>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={item.name.last}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>content</div>
              </Skeleton>
            </List.Item>
          )}
        />
        <Pagination total={50} itemRender={itemRender} />
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

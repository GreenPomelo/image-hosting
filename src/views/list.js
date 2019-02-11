import React from 'react';
import { List, Avatar, Button, Skeleton, Pagination } from 'antd';
import '../style/list.css';
import { getHistoryUpList } from '../api/list';

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}

const count = 3;

export default class QyList extends React.Component {
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

    const TOKEN = localStorage.getItem(`token`);
    console.log(TOKEN);
    getHistoryUpList(ONE, TWENTY, TOKEN).then(
      ({ data: { success, data, errMsg } }) => {
        console.log(data);
        console.log(success);
        console.log(errMsg);
        // if (errMsg === 'Unauthorized Request') {
        // }
        // this.setState({
        //   initLoading: false,
        //   data: res.results,
        //   list: res.results
        // });
      }
    );
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

    return (
      <div className="list-container">
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<a>edit</a>, <a>more</a>]}>
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

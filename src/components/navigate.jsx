import React from "react";
import { Layout, Menu } from "antd";
import "../style/navigate.css";
import QyLogin from "./login";
import QyUpload from "./upload";
import QyList from "./list";
const { Header, Content, Footer } = Layout;
export default class Navigate extends React.Component {
  constructor() {
    super();
    this.state = {
      navigateContent: "登录"
    };
  }
  navigate = navigateContent => {
    this.setState({ navigateContent: navigateContent });
  };
  render() {
    const { navigateContent } = this.state;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["3"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item
              key="1"
              onClick={() => {
                this.navigate("上传");
              }}
            >
              上传
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                this.navigate("列表");
              }}
            >
              上传图片列表
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                this.navigate("登录");
              }}
            >
              登录
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          {navigateContent === "登录" ? <QyLogin /> : null}
          {navigateContent === "上传" ? <QyUpload /> : null}
          {navigateContent === "列表" ? <QyList /> : null}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          CopyRight @2017-2018 青柚工作室 qingyou.njupt.edu.cn
        </Footer>
      </Layout>
    );
  }
}

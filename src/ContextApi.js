import React from "react";

import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

//必须声明contextType
class UserName extends React.Component {
  static contextTypes = {
    user: PropTypes.number
  };
  render() {
    return <div>用户名：{this.context.user}</div>;
  }
}
/**
 * 如果组件是函数，第二个参数是context，同时必须声明contextType
 */
const Title = ({ name }, context) => {
  return (
    <div>
      文章标题：{name}， 用户名：{context.user}
    </div>
  );
};
Title.contextTypes = {
  user: PropTypes.number
};

/**
 * childContextTypes 声明context 的静态属性类型
 * getChildContext 设置context的state值。
 */
export default class ContentApi extends React.Component {
  static childContextTypes = {
    user: PropTypes.number
  };
  getChildContext() {
    return {
      user: "张三"
    };
  }
  render() {
    return (
      <div className="App">
        <React.StrictMode className="StrictMode">
          <Title name="React 16 demo" />
          <UserName />
        </React.StrictMode>
      </div>
    );
  }
}

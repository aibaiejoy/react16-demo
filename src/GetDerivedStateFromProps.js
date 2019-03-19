import React from "react";

import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

//必须声明contextType
class UserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "lg"
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 这一生命周期方法是静态的，它在组件实例化或接收到新的 props 时被触发
    // 若它的返回值是对象，则将被用于更新 state ；若是 null ，则不触发 state 的更新
    // console.log(nextProps, prevState)
    return prevState;
    // 配合 `componentDidUpdate` 使用，这一方法可以取代 `componentWillReceiveProps`
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 该方法在实际改动（比如 DOM 更新）发生前的“瞬间”被调用，返回值将作为 `componentDidUpdate` 的第三个参数
    console.log("getSnapshotBeforeUpdate", prevProps, prevState);
    // 配合 `componentDidUpdate` 使用，这一方法可以取代 `componentWillUpdate`
    return prevState;
  }

  componentDidUpdate(props, state, snaptshot) {
    // 新增的参数 snapshot 即是之前调用 getSnapshotBeforeUpdate 的返回值
    console.log("componentDidUpdate", props, state, snaptshot);
  }
  render() {
    return <div>用户名：{this.state.name}</div>;
  }
}

/**
 * childContextTypes 声明context 的静态属性类型
 * getChildContext 设置context的state值。
 */
export default class ContentApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "张三"
    };
  }
  componentDidMount() {
    let i = 0;
    const _timer = setInterval(() => {
      this.setState({ name: this.state.name + 1 });
      if (i++ > 3) {
        clearInterval(_timer);
      }
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        <UserName name={this.state.name} />
      </div>
    );
  }
}

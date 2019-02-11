import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem('token')
    };
  }

  componentWillMount() {
    if (!this.state.isAuthenticated) {
      const { history } = this.props;
      setTimeout(() => {
        history.replace('/login');
      }, 1000);
    }
  }

  render() {
    const { component, ...rest } = this.props;
    return this.state.isAuthenticated ? (
      <Route {...rest} render={props => <component {...props} />} />
    ) : (
      <p
        style={{
          width: '100%',
          'text-align': 'center',
          fontSize: '20px',
          lineHeight: '50px'
        }}
      >
        请登录...
      </p>
    );
  }
}

export default withRouter(PrivateRoute);

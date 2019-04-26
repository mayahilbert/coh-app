import React, { Component } from 'react';
import { Grid, Form, Header, Message } from 'semantic-ui-react';


export default class Login extends Component {
onSubmit(e) {
  e.preventDefault();

  const { username, password } = this.state;
  const { history } = this.props;

  this.setState({ error: false });

  if (!(username === 'george' && password === 'foreman')) {
    return this.setState({ error: true });
  }

  store.set('loggedIn', true);
  history.push('/users');
}

render() {
return();

}

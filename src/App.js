import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import LoginPage from './components/LoginPage';
import MainRouter from './components/MainRouter';
class App extends Component{
  render() {
      if (this.state.fetching) {
          return (
              <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
              </Dimmer>
          );
      } else if (this.state.fetched) {
          if (this.state.authenticated) {
              return (<MainRouter />);
          }
          else {
              return (<LoginPage error={this.props.user.error}/>);
          }
      }
      return null;
  }

}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
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
              return (<AppContext.Provider value={{umpire: this.state.umpire, decode: this.decode}}><MainRouter umpire={this.state.umpire}/></AppContext.Provider>);
          }
          else {
              return (<LoginPage decode={this.decode}/>);
          }
      }
      return null;
  }

}

export default App;

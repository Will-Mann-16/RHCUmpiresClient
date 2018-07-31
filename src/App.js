import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Dimmer, Loader } from 'semantic-ui-react';

import LoginPage from './js/LoginPage';
import MainRouter from './js/MainRouter';
import AppContext from './js/context';
class App extends Component{
  state = {
    fetching: false,
      fetched: false,
      authenticated: false,
      umpire: {},
      error: null
  };
  decode = () => {
      if(localStorage.getItem("UMPIRE_TOKEN")){
        this.setState({...this.state, fetching: true, fetched: false, authenticated: false}, () => {
            axios.post('http://localhost/rhcumpires/auth.php', qs.stringify({token: localStorage.getItem("UMPIRE_TOKEN"), request: 'DECODE'})).then((response) => {
              if(response.data.success) {
                  if (response.data.authenticated) {
                      this.setState({...this.state, fetching: false, fetched: true, authenticated: true, umpire: response.data.umpire});
                  }
                  else {
                      this.setState({...this.state, fetching: false, fetched: true, authenticated: false, umpire: {}});
                  }
              }
              else{
                  this.setState({...this.state, fetching: false, fetched: true, authenticated: false, error: response.data.error});
              }
            });
        });
      }
      else{
        this.setState({
            ...this.state,
            fetching: false,
            fetched: true,
            authenticated: false,
            umpire: {}
        });
      }
  }
  componentWillMount(){
    this.decode();
  }
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

import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoginPage from './components/LoginPage';
import MainRouter from './components/MainRouter';
import {readUmpire} from "./actions/umpireActions";
class App extends Component{
    componentWillMount(){
        this.props.dispatch(readUmpire());
    }
  render() {
      if (this.props.umpire.fetching) {
          return (
              <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
              </Dimmer>
          );
      } else if (this.props.umpire.fetched) {
          if (this.props.umpire.authenticated) {
              return (<MainRouter />);
          }
          else {
              return (<LoginPage />);
          }
      }
      return null;
  }

}

const mapStateToProps = state => {
    return {
        umpire: state.umpire
    }
}

export default connect(mapStateToProps)(App);

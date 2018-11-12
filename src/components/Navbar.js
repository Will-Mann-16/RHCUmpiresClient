import React from 'react';
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
export default class Navbar extends React.Component{
    render(){
        return(
          <Menu pointing secondary>
              <Menu.Item as={NavLink} exact to='/' >Dashboard</Menu.Item>
              <Menu.Item as={NavLink} exact to='/availability'>Availability</Menu.Item>
              <Menu.Item as={NavLink} exact to='/matches'>Matches</Menu.Item>
          </Menu>
        );
    }
}
import React from 'react';
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
class Navbar extends React.Component{
    render(){
        var {user} = this.props.umpire;
        return(
          <Menu pointing secondary>
              <Menu.Item as={NavLink} exact to='/' >Dashboard</Menu.Item>
              <Menu.Item as={NavLink} exact to='/availability'>Availability</Menu.Item>
              <Menu.Item as={NavLink} exact to='/matches'>Matches</Menu.Item>
              {user.Admin && <Menu.Item as={NavLink} exact to='/admin'>Admin</Menu.Item>}
              <Menu.Item as={null} position='right'>{user.Firstname} {user.Surname}</Menu.Item>
          </Menu>
        );
    }
}

const mapStateToProps = state => {
    return {
        umpire: state.umpire
    }
};

export default connect(mapStateToProps)(Navbar);
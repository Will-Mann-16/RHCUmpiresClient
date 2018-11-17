import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Header, Container} from 'semantic-ui-react';
import CreateFixture from "./CreateFixture";
class AdminPage extends React.Component{
    render(){
        var { user } = this.props.umpire;
        if(!user.Admin){
            return (<Redirect to="/"/>);
        }
        return(
          <Container>
              <Header>Admin</Header>
              <CreateFixture/>
          </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        umpire: state.umpire
    }
};

export default connect(mapStateToProps)(AdminPage);
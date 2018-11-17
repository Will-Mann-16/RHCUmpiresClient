import React from 'react';
import { connect } from 'react-redux';
import {Form, Message, Container} from 'semantic-ui-react';
import {authenticateUmpire} from "../actions/umpireActions";

class LoginPage extends React.Component{
    state = {
        email: '',
        password: ''
    }
    submitForm = () => {
        this.props.dispatch(authenticateUmpire(this.state.email, this.state.password));
    }
    render(){
        return(
            <Container>
                <Form>
                    <Form.Input fluid label='Email' placeholder='Email' onChange={(e) => this.setState({...this.state, email: e.target.value})} value={this.state.email}/>
                    <Form.Input fluid label='Password' placeholder='Password' type='password' onChange={(e) => this.setState({...this.state, password: e.target.value})} value={this.state.password}/>
                    <Form.Button onClick={this.submitForm}>Login</Form.Button>
                </Form>
                {this.props.umpire.error && (<Message negative><Message.Header>{this.props.umpire.error}</Message.Header></Message>)}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        umpire: state.umpire
    }
}

export default connect(mapStateToProps)(LoginPage);
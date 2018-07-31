import React from 'react';
import axios from 'axios';
import qs from 'qs';
import {Form, Message, Container} from 'semantic-ui-react';

export default class LoginPage extends React.Component{
    state = {
        error: null,
        email: '',
        password: ''
    }
    submitForm = () => {
        axios.post('http://localhost/rhcumpires/auth.php', qs.stringify({email: this.state.email, password: this.state.password, request: 'SIGN'})).then((response) => {
            if(response.data.success){
                if(response.data.authenticated){
                    localStorage.setItem("UMPIRE_TOKEN", response.data.token);
                    this.props.decode();
                }
                else{
                    this.setState({...this.state, error: 'Invalid Email/Password Combination'});
                }
            }
            else{
                this.setState({...this.state, error: 'Error with server, please try again later.'});
            }
        }).catch((error) =>{
            console.log(error);
            this.setState({...this.state, error: 'Error with server, please try again later.'});
        });
    }
    render(){
        return(
            <Container>
                <Form>
                    <Form.Input fluid label='Email' placeholder='Email' onChange={(e) => this.setState({...this.state, email: e.target.value})} value={this.state.email}/>
                    <Form.Input fluid label='Password' placeholder='Password' type='password' onChange={(e) => this.setState({...this.state, password: e.target.value})} value={this.state.password}/>
                    <Form.Button onClick={this.submitForm}>Login</Form.Button>
                </Form>
                {this.state.error && (<Message negative><Message.Header>{this.state.error}</Message.Header></Message>)}
            </Container>
        );
    }
}
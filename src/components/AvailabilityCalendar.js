import React from 'react';
import Calendar from './Calendar';
import axios from "axios";
export default class AvailabilityCalendar extends React.Component{
    state ={
        error: null,
        dates: []
    }
    componentWillMount() {
        axios.get('http://localhost/rhcumpires/getCalendar.php', {params:{
            umpireID: this.props.context.umpire.umpireID,
            request: 'FOR_USER'
        }}).then((response) => {
            if (response.data.success) {
                this.setState({...this.state, dates: response.data.dates});
            }
            else {
                this.setState({...this.state, error: 'Error with server, please try again later.'});
            }
        }).catch((error) => {
            this.setState({...this.state, error: 'Error with client, please try again later.'});
        });
    }
    render(){
        return(
            <Calendar dates={this.state.dates}/>
        );
    }
}
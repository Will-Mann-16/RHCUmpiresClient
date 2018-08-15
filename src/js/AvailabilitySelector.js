import React from 'react';
import axios from 'axios';

export default class AvailabilitySelector extends React.Component{
    state = {
        fetching: false,
        fetched: false,
        error: null,
        availability: []
    }
    componentWillMount(){
        axios.get('http://localhost/rhcumpires/getAvailability.php', {params: {request: "AVAILABILITY_PAGE", umpireID: this.props.context.umpire.umpireID}}).then(({data}) => {

        });
    }
}
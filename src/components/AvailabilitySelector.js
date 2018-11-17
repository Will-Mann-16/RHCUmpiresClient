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
    }
}
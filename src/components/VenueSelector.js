import React from 'react';
import {Dropdown, Header} from 'semantic-ui-react';
import {createInstance} from "../config";
export default class VenueSelector extends React.Component{
    state = {
        fetching: false,
        fetched: false,
        error: null,
        venues: []
    }
    componentWillMount(){
        this.setState({...this.state, fetching: true, fetched: false});
        createInstance().get('/venues/').then(({data}) => {
            this.setState({...this.state, fetching: false, fetched: true, venues: data});
        }).catch((e) => this.setState({...this.state, fetching: false, fetched: true, error: e.message}));
    }
    render(){
        var options = this.state.venues.map((venue) => {
            return {key: venue.venueID, text: venue.Name, value: venue.venueID, content: <Header content={venue.Name} subheader={venue.Address} />}
        })
        return (
            <Dropdown placeholder='Venue' loading={this.state.fetching} fluid search selection options={options} onChange={(e, {value}) => this.props.onChange({name: 'venue', value})} value={this.props.value} />);
    }
}
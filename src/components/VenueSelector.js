import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import axios from 'axios';
export default class VenueSelector extends React.Component{
    state = {
        fetching: false,
        fetched: false,
        error: null,
        venues: []
    }
    componentWillMount(){
        this.setState({...this.state, fetching: true, fetched: false});
        axios.get('http://localhost/rhcumpires/getVenues.php').then(({data}) => {
           if(data.success){
                this.setState({...this.state, fetching: false, fetched: true, venues: data.venues});
           }else{
                this.setState({...this.state, fetching: false, fetched: true, error: data.message});
           }
        });
    }
    render(){
        return (
            <Dropdown placeholder={this.props.placeholder} loading={this.state.fetching} fluid search selection onChange={this.props.onChange} value={this.props.value}>
                <Dropdown.Menu scrolling>
                    {this.state.venues.map((venue, key) =>
                        <Dropdown.Item key={key} value={venue.venueID}>{venue.Address}</Dropdown.Item>
                        )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
import React from 'react';
import { Container } from 'semantic-ui-react';
import TeamSelector from "./TeamSelector";
import LeagueSelector from "./LeagueSelector";
import VenueSelector from "./VenueSelector";


export default class CreateFixturePage extends React.Component{
    state = {
        homeTeam: '',
        awayTeam: '',
        league: '',
        venue: ''
    }
    handleChange = e => {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }
    render(){
        return (
            <Container>
                <TeamSelector onChange={this.handleChange} value={this.state.homeTeam}/>
                <TeamSelector onChange={this.handleChange} value={this.state.awayTeam}/>
                <LeagueSelector onChange={this.handleChange} value={this.state.league}/>
                <VenueSelector onChange={this.handleChange} value={this.state.venue}/>
            </Container>
        );
    }
}
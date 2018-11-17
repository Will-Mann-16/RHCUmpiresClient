import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Input } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import TeamsSelector from "./TeamsSelector";
import LeagueSelector from "./LeagueSelector";
import VenueSelector from "./VenueSelector";

import { createFixture } from '../actions/fixtureActions';


class CreateFixture extends React.Component{
    state = {
        dateTime: '',
        homeTeam: '',
        awayTeam: '',
        league: '',
        venue: '',
        timeSlot: '',
        noOfUmpires: ''
    }
    submitForm = () => {
        this.props.dispatch(createFixture({DateTime: this.state.dateTime, homeTeamFK: this.state.homeTeam, awayTeamFK: this.state.awayTeam, leagueFK: this.state.leagueFK, venueFK: this.state.venueFK, TimeSlot: parseInt(this.state.timeSlot), NoOfUmpires: parseInt(this.state.noOfUmpires)}));
    }
    handleChange = ({name, value}) => {
        this.setState({...this.state, [name]: value});
    }
    render(){
        return (
            <Container>
                <DateTimeInput placeholder="Date Time" iconPosition="left" fluid value={this.state.dateTime} onChange={(e, {value}) => this.handleChange({name: 'dateTime', value})}/>
                <TeamsSelector onChange={this.handleChange} homeTeam={this.state.homeTeam} awayTeam={this.state.awayTeam}/>
                <VenueSelector onChange={this.handleChange} value={this.state.venue}/>
                <LeagueSelector onChange={this.handleChange} value={this.state.league}/>
                <Input placeholder="Time slot (in minutes)" name="timeSlot" onChange={(e, {name, value}) => this.handleChange({name, value})} value={this.state.timeSlot}/>
                <Input placeholder="No of Umpires" name="noOfUmpires" onChange={(e, {name, value}) => this.handleChange({name, value})} value={this.state.noOfUmpires}/>
                <Button onClick={this.submitForm}>Submit</Button>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

export default connect(mapStateToProps)(CreateFixture);
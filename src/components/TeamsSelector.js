import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import {createInstance} from "../config";
export default class TeamsSelector extends React.Component{
    state = {
        fetching: false,
        fetched: false,
        error: null,
        teams: [],
        activeHomeClub: -1,
        activeAwayClub: -1
    }
    componentWillMount(){
        this.setState({...this.state, fetching: true, fetched: false});
        createInstance().get('/clubs/').then(({data}) => {
                this.setState({...this.state, fetching: false, fetched: true, teams: data});
        }).catch((e) => this.setState({...this.state, fetching: false, fetched: true, error: e.message}));
    }
    render(){
        var clubOptions = this.state.teams.map((club, key) => {
            return {key: club.clubID, text: club.Name, value: key}
        });
        var homeTeamOptions = this.state.activeHomeClub >= 0 ? this.state.teams[this.state.activeHomeClub].Teams.map((team) => {
           return {key: team.teamID, text: team.Name, value: team.teamID};
        }) : [];
        var awayTeamOptions = this.state.activeAwayClub >= 0 ? this.state.teams[this.state.activeAwayClub].Teams.map((team) => {
            return {key: team.teamID, text: team.Name, value: team.teamID};
        }) : [];
        return (
            <React.Fragment>
                <Dropdown placeholder='Home Club' loading={this.state.fetching} fluid search selection onChange={(e, {value}) => this.setState({...this.state, activeHomeClub: value})} value={this.state.activeHomeClub >= 0 ? this.state.activeHomeClub : null} options={clubOptions}/>
                {this.state.activeHomeClub >= 0 && <Dropdown placeholder='Home Team' loading={this.state.fetching} fluid search selection onChange={(e, {value}) => this.props.onChange({name: 'homeTeam', value})} value={this.props.homeTeam} options={homeTeamOptions} />}
                <Dropdown placeholder='Away Club' loading={this.state.fetching} fluid search selection onChange={(e, {value}) => this.setState({...this.state, activeAwayClub: value})} value={this.state.activeAwayClub >= 0 ? this.state.activeAwayClub : null} options={clubOptions}/>
                {this.state.activeAwayClub >= 0 && <Dropdown placeholder='Away Team' loading={this.state.fetching} fluid search selection onChange={(e, {value}) => this.props.onChange({name: 'awayTeam', value})} value={this.props.awayTeam} options={awayTeamOptions} />}
            </React.Fragment>
        );
    }
}
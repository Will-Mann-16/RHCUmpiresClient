import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import axios from 'axios';
import {createInstance} from "../config";
export default class LeagueSelector extends React.Component{
    state = {
        fetching: false,
        fetched: false,
        error: null,
        leagues: [],
        activeDivision: -1
    }
    componentWillMount(){
        this.setState({...this.state, fetching: true, fetched: false});
        createInstance().get('/divisions/').then(({data}) => {
            this.setState({...this.state, fetching: false, fetched: true, leagues: data});
        }).catch((e) => this.setState({...this.state, fetching: false, fetched: true, error: e.message}));
    }
    render(){
        var divisionOptions = this.state.leagues.map((division, key) => {
            return {key: division.divisionID, text: division.Name, value: key}
        });
        var leagueOptions = this.state.activeDivision >= 0 ? this.state.leagues[this.state.activeDivision].Leagues.map((league) => {
            return {key: league.leagueID, text: league.Name, value: league.leagueID};
        }) : [];
        return (
            <React.Fragment>
                <Dropdown placeholder='Division' loading={this.state.fetching} fluid search selection onChange={(e, {value}) => this.setState({...this.state, activeDivision: value})} value={this.state.activeDivision >= 0 ? this.state.activeDivision : null} options={divisionOptions}/>
                {this.state.activeDivision >= 0 && <Dropdown placeholder='League' loading={this.state.fetching} fluid search selection onChange={(e, {value}) => this.props.onChange({name: 'league', value})} value={this.props.value} options={leagueOptions} />}
            </React.Fragment>
        );
    }
}
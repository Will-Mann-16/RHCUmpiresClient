import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import axios from 'axios';
export default class TeamSelector extends React.Component{
    state = {
        fetching: false,
        fetched: false,
        error: null,
        teams: []
    }
    componentWillMount(){
        this.setState({...this.state, fetching: true, fetched: false});
        axios.get('http://localhost/rhcumpires/getTeams.php').then(({data}) => {
           if(data.success){
                this.setState({...this.state, fetching: false, fetched: true, teams: data.teams});
           }else{
                this.setState({...this.state, fetching: false, fetched: true, error: data.message});
           }
        });
    }
    render(){
        return (
            <Dropdown placeholder={this.props.placeholder} loading={this.state.fetching} fluid search selection onChange={this.props.onChange} value={this.props.value}>
                <Dropdown.Menu scrolling>
                    {this.state.teams.map((team, key) =>
                        <React.Fragment key={key}>
                            <Dropdown.Header content={team.Club.Name} />
                            <Dropdown.Menu>
                                {team.Teams.map((newTeam, key2) => <Dropdown.Item value={newTeam.teamID} key={key2}>{newTeam.Name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </React.Fragment>
                        )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
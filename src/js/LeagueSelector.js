import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import axios from 'axios';
export default class LeagueSelector extends React.Component{
    state = {
        fetching: false,
        fetched: false,
        error: null,
        leagues: []
    }
    componentWillMount(){
        this.setState({...this.state, fetching: true, fetched: false});
        axios.get('http://localhost/rhcumpires/getLeagues.php').then(({data}) => {
           if(data.success){
                this.setState({...this.state, fetching: false, fetched: true, leagues: data.leagues});
           }else{
                this.setState({...this.state, fetching: false, fetched: true, error: data.message});
           }
        });
    }
    render(){
        return (
            <Dropdown placeholder={this.props.placeholder} loading={this.state.fetching} fluid search selection onChange={this.props.onChange} value={this.props.value}>
                <Dropdown.Menu scrolling>
                    {this.state.leagues.map((league, key) =>
                        <React.Fragment key={key}>
                            <Dropdown.Header content={league.Division.Name} />
                            <Dropdown.Menu>
                                {league.Leagues.map((newLeague, key2) => <Dropdown.Item value={newLeague.leagueID} key={key2}>{newLeague.Name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </React.Fragment>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
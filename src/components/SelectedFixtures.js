import React from 'react';
import axios from "axios/index";
import {Segment, Card, List, Divider, Button} from 'semantic-ui-react';
import {Toggle} from 'react-powerplug';
export default class SelectedFixtures extends React.Component {
    state = {
        fetching: false,
        fetched: false,
        error: null,
        fixtures: []
    }

    componentWillMount() {
        axios.get('http://localhost/rhcumpires/getFixtures.php', {
            params: {
                umpireID: this.props.context.umpire.umpireID,
                request: 'PER_UMPIRE'
            }
        }).then((response) => {
            if (response.data.success) {
                this.setState({...this.state, fetching: false, fetched: true, fixtures: response.data.fixtures});
            }
            else {
                this.setState({...this.state, fetching: false, fetched: true, error: 'Error with server'});
            }
        }).catch((error) => {
            this.setState({...this.state, fetching: false, fetched: true, error: error});
        });
    }

    render() {
        if (this.state.fetching) {
            return (
                <Segment loading/>
            );
        }
        var fixtures = this.state.fixtures.map((fixture, key) => {
            var dateTime = new Date(fixture.DateTime);
            return (
                <Toggle>
                    {({on, toggle}) =>
                        <Card raised key={key}>
                            <Card.Content>
                                <Card.Header>
                                    {fixture.HomeTeam.ClubName + ' - ' + fixture.HomeTeam.TeamName}
                                    <Divider horizontal>VS</Divider>
                                    {fixture.AwayTeam.ClubName + ' - ' + fixture.AwayTeam.TeamName}
                                </Card.Header>
                                <Card.Meta>
                                    {dateTime.toLocaleString()}
                                </Card.Meta>
                                <Card.Description>{fixture.Venue.Name}</Card.Description>
                                <Card.Description>{fixture.Venue.Address}</Card.Description>
                            </Card.Content>
                            <Card.Content style={on ? {} : {display: 'none'}}>
                                <Card.Description>{fixture.League.LeagueName}</Card.Description>
                                <Card.Description>{fixture.League.DivisionName}</Card.Description>
                            </Card.Content>
                            <Card.Content extra style={on ? {} : {display: 'none'}}>
                                <List>
                                    {fixture.Umpires.map((umpire, key2) => (
                                        <List.Item key={key2}>
                                            <List.Header>{umpire.Firstname} {umpire.Surname}</List.Header>
                                            <List>
                                                <List.Item>
                                                    <List.Icon name='mail'/>
                                                    <List.Content>
                                                        <a href={'mailto:' + umpire.Email}>{umpire.Email}</a>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Icon name='phone'/>
                                                    <List.Content>
                                                        <a href={'tel:' + umpire.PhoneNumber}>{umpire.PhoneNumber}</a>
                                                    </List.Content>
                                                </List.Item>
                                            </List>
                                        </List.Item>
                                    ))}
                                </List>
                            </Card.Content>
                            <Button attached='bottom' icon={on ? 'angle up' : 'angle down'} onClick={toggle}/>
                        </Card>
                    }
                </Toggle>
            );
        });
        return (
            <Segment>
                <Card.Group>
                    {fixtures}
                </Card.Group>
            </Segment>
        );
    }
}

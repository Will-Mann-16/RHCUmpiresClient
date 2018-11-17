import React from 'react';
import { connect } from 'react-redux';
import {Segment, Card, List, Divider, Button} from 'semantic-ui-react';
import {Toggle} from 'react-powerplug';
import {readSelectedFixtures} from "../actions/fixtureActions";
 class SelectedFixtures extends React.Component {
    componentWillMount(){
        this.props.dispatch(readSelectedFixtures());
    }

    render() {
        var {fixtures} = this.props;
        if (fixtures.fetching) {
            return (
                <Segment loading/>
            );
        }
        var selectedFixtures = fixtures.selectedFixtures.map((fixture, key) => {
            var dateTime = new Date(fixture.DateTime);
            return (
                <Toggle>
                    {({on, toggle}) =>
                        <Card raised key={key}>
                            <Card.Content>
                                <Card.Header>
                                    {fixture.HomeTeam.Club.Name + ' - ' + fixture.HomeTeam.Name}
                                    <Divider horizontal>VS</Divider>
                                    {fixture.AwayTeam.Club.Name + ' - ' + fixture.AwayTeam.Name}
                                </Card.Header>
                                <Card.Meta>
                                    {dateTime.toLocaleString()}
                                </Card.Meta>
                                <Card.Description>{fixture.Venue.Name}</Card.Description>
                                <Card.Description>{fixture.Venue.Address}</Card.Description>
                            </Card.Content>
                            <Card.Content style={on ? {} : {display: 'none'}}>
                                <Card.Description>{fixture.League.Name}</Card.Description>
                                <Card.Description>{fixture.League.Division.Name}</Card.Description>
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
                    {selectedFixtures}
                </Card.Group>
            </Segment>
        );
    }
}

const mapStateToProps = state => {
     return {
         fixtures: state.fixtures
     }
};

 export default connect(mapStateToProps)(SelectedFixtures);
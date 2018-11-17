import React from 'react';
import { connect } from 'react-redux';
import SelectedFixtures from './SelectedFixtures';
import {Container, Header} from 'semantic-ui-react';
import AvailabilityCalendar from "./AvailabilityCalendar";
class DashboardPage extends React.Component{
    render(){
        return (
            <Container>
                <Header as='h1'>Reading Hockey Umpires</Header>
                <Header as='h2'>{this.props.umpire.user.Firstname} {this.props.umpire.user.Surname}</Header>
                <SelectedFixtures small/>
                <AvailabilityCalendar/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        umpire: state.umpire
    }
};

export default connect(mapStateToProps)(DashboardPage);
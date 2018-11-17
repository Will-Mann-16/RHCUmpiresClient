import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Calendar from './Calendar';
class AvailabilityCalendar extends React.Component{
    render(){
        return(
            <Segment>
                <Calendar selected={this.props.fixtures.selectedFixtures} available={this.props.fixtures.availableFixtures}/>
            </Segment>
        );
    }
}

const mapStateToProps = state => {
    return {
        fixtures: state.fixtures
    }
};

export default connect(mapStateToProps)(AvailabilityCalendar);
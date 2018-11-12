import React from 'react';
import AppContext from './context';
import SelectedFixtures from './SelectedFixtures';
import AvailabilityCalendar from './AvailabilityCalendar';
import {Container} from 'semantic-ui-react';
export default class DashboardPage extends React.Component{
    render(){
        return (
            <Container>
                <AppContext.Consumer>
                    {context => (
                        <React.Fragment>
                            <SelectedFixtures small context={context}/>
                            <AvailabilityCalendar context={context}/>
                        </React.Fragment>
                        )}

                </AppContext.Consumer>
            </Container>
        );
    }
}
import React from 'react';
import {Container} from 'semantic-ui-react';
import AppContext from './context';
export default class AvailabilityPage extends React.Component{
    render(){
        return (
            <Container>
                <AppContext.Consumer>
                    {(context) => (
                        <AvailabiltySelector context={context}/>
                    )}
                </AppContext.Consumer>
            </Container>
        );
    }
}

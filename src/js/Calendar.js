import React from 'react';
import moment from 'moment';
import {Table, Button} from 'semantic-ui-react';
import _ from 'lodash';

const TODAY_STYLE = {fontWeight: 'bold', textShadow: '0 0 3px #CCC'};
const UMPIRE_FIXTURE_STYLE = {backgroundColor: '#4CAF50'};
export default class Calendar extends React.Component {
    state = {
        activeDay: moment().startOf('month'),
    }
    nextMonth = () => {
        var activeDay = this.state.activeDay.clone();
        activeDay.add(1, 'month').startOf('month');
        this.setState({...this.state, activeDay: activeDay});
    }
    previousMonth = () => {
        var activeDay = this.state.activeDay.clone();
        activeDay.subtract(1, 'month').startOf('month');
        this.setState({...this.state, activeDay: activeDay});
    }

    render() {
        var weekDays = moment.weekdaysShort();
        var first = weekDays.shift();
        weekDays.push(first);
        var daysInMonth = [];
        var monthCounter = this.state.activeDay.clone();
        var week = [];
        var offset = this.state.activeDay.day() - 1;
        _.times(monthCounter.daysInMonth(), n => {
            var type = this.props.dates.find((element) => moment(element.DateTime).format('YYYY-MM-DD') === monthCounter.format('YYYY-MM-DD'));
            var style = {};
            if (type) {
                switch (type.Type) {
                    case 'UMPIRE_FIXTURE':
                        _.merge(style, UMPIRE_FIXTURE_STYLE)
                        break;
                }
            }
            if (monthCounter.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
                style = _.merge(style, TODAY_STYLE);
            }
            if (n === 0 && offset > 0) {
                week.push(<Table.Cell colSpan={offset}/>);
            }
            else if (n === 0 && offset === -1) {
                week.push(<Table.Cell colSpan={6}/>);
            }
            if ((n + offset) % 7 === 0) {
                daysInMonth.push(week);
                week = [];
            }
            week.push(<Table.Cell style={style} textAlign='center'>{monthCounter.format('D')}</Table.Cell>);
            monthCounter.add(1, 'day');
        });
        var finalOffset = 7 - week.length;
        if(finalOffset > 0){
            week.push(<Table.Cell colSpan={finalOffset} />);
        }
        daysInMonth.push(week);
        return (
            <Table structured fixed columns={7}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><Button size='huge' basic compact fluid icon='angle left'
                                                  onClick={this.previousMonth}/></Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'
                                          colSpan={5}>{this.state.activeDay.format('MMMM YYYY')}</Table.HeaderCell>
                        <Table.HeaderCell><Button size='huge' basic compact fluid icon='angle right'
                                                  onClick={this.nextMonth}/></Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        {weekDays.map((weekday, key) => <Table.HeaderCell key={key} textAlign='center'>{weekday}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {daysInMonth.map((week, key) => <Table.Row key={key}>{week}</Table.Row>)}
                </Table.Body>
            </Table>
        );
    }
}
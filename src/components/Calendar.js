import React from 'react';
import moment from 'moment';
import {Table, Button} from 'semantic-ui-react';
import _ from 'lodash';

const TODAY_STYLE = {fontWeight: 'bold', textShadow: '0 0 3px #CCC'};
const UMPIRE_FIXTURE_STYLE = {backgroundColor: '#3498db'};
const AVAILABLE_FIXTURE_STYLE = {backgroundColor: '#27ae60'};
const MAYBE_AVAILABLE_FIXTURE_STYLE = {backgroundColor: '#e67e22'};
const NOT_AVAILABLE_FIXTURE_STYLE = {backgroundColor: '#c0392b'};
const UNDECIDED_FIXTURE_STYLE = {backgroundColor: '#95a5a6'};
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
        var selectedDates = this.props.selected.map((elem) => {
            return {Style: UMPIRE_FIXTURE_STYLE, DateTime: elem.DateTime};
        });
        var availableDates = this.props.available.map((elem) => {
            switch(elem.Available){
                case 'UNDECIDED':
                    return {Style: UNDECIDED_FIXTURE_STYLE, DateTime: elem.DateTime};
                case 'YES':
                    return {Style: AVAILABLE_FIXTURE_STYLE, DateTime: elem.DateTime};
                case 'NO':
                    return {Style: NOT_AVAILABLE_FIXTURE_STYLE, DateTime: elem.DateTime};
                case 'MAYBE':
                    return {Style: MAYBE_AVAILABLE_FIXTURE_STYLE, DateTime: elem.DateTime};
            }
        });
        var dates = [...selectedDates, ...availableDates];
        _.times(monthCounter.daysInMonth(), n => {
            var newStyle = dates.find((element) => moment(element.DateTime).format('YYYY-MM-DD') === monthCounter.format('YYYY-MM-DD'));
            var style = {};
            if (newStyle) {
                _.merge(style, newStyle.Style)
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
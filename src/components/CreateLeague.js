import React from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown } from 'semantic-ui-react';
import {createInstance} from "../config";

class CreateLeague extends React.Component{
    state = {
        fetching: false,
        fetched: false,
        error: null,
        divisions: [],
        qualifications: []
    }
    componentWillMount(){
        this.getDivisions();
        this.getQualifications();
    }
    getDivisions = () => {
        this.setState({...this.state, fetching: true, fetched: false});
        createInstance().get('/divisions/').then(({data}) => {
            this.setState({...this.state, fetching: false, fetched: true, divisions: data});
        }).catch((e) => this.setState({...this.state, fetching: false, fetched: true, error: e.message}));
    }
    getQualifications = () => {
        this.setState({...this.state, fetching: true, fetched: false});
        createInstance().get('/qualifications/').then(({data}) => {
            this.setState({...this.state, fetching: false, fetched: true, qualifications: data});
        }).catch((e) => this.setState({...this.state, fetching: false, fetched: true, error: e.message}));
    }
    render(){
        var divisionOptions = this.state.divisions.map((division, key) => {
           return {key: key, name: division.Name, value: division.divisionID};
        });
        var qualificationOptions = this.state.qualifications.map((qualification, key) => {
            return {key: key, name: qualification.Name, value: qualification.qualificationID};
        });
        return (
        <Form loading={this.state.fetching}>
            <Form.Group widths='equal'>
                <Form.Field label="Name" placeholder="Name"/>
                <Form.Field content={Dropdown} label="Division" options={divisionOptions} placeholder="Division" />
                <Form.Field content={Dropdown} label="Qualifications" options={qualificationOptions} placeholder="Qualifications Required" />
            </Form.Group>
        </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        umpire: state.umpire
    }
}

export default connect(mapStateToProps)(CreateLeague);
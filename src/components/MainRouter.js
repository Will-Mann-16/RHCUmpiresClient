import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import DashboardPage from './DashboardPage';
import AdminPage from "./AdminPage";
export default class MainRouter extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Navbar />
                <Switch>
                    <Route path='/' name='dashboard' exact component={DashboardPage}/>
                    <Route path='/admin' name='admin' exact component={AdminPage}/>
                </Switch>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}
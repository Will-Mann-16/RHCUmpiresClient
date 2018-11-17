import { createInstance } from "../config";

export function createFixture(fixture){
    return async dispatch => {
        dispatch({type: 'CREATE_FIXTURE'});
        try{
            var {data} = await createInstance().post('/fixtures/', {fixture});
            dispatch({type: 'CREATE_FIXTURE_FULFILLED', payload: data});
        } catch (e) {
            dispatch({type: 'CREATE_FIXTURE_REJECTED', payload: e.message});
        }
    }
}

export function readSelectedFixtures(){
    return async dispatch => {
        dispatch({type: 'READ_SELECTED_FIXTURES'});
        try{
            var {data} = await createInstance().get('/fixtures/umpire');
            dispatch({type: 'READ_SELECTED_FIXTURES_FULFILLED', payload: data});
        } catch (e) {
            dispatch({type: 'READ_SELECTED_FIXTURES_REJECTED', payload: e.message});
        }
    }
}

export function readAvailableFixtures(){
    return async dispatch => {
        dispatch({type: 'READ_AVAILABLE_FIXTURES'});
        try{
            var {data} = await createInstance().get('/availability/');
            dispatch({type: 'READ_AVAILABLE_FIXTURES_FULFILLED', payload: data});
        } catch (e) {
            dispatch({type: 'READ_AVAILABLE_FIXTURES_REJECTED', payload: e.message});
        }
    }}
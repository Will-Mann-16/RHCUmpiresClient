import { URL, createInstance } from "../config";
import axios from 'axios';


export function authenticateUmpire(username, password){
    return async dispatch => {
        dispatch({type: 'AUTHENTICATE_UMPIRE'});
        try {
            var {data, status} = await axios.post(URL + '/auth/login', {username, password});
            if(data.success && status === 200){
                sessionStorage.setItem('UMPIRE_TOKEN', data.token);
                dispatch({type: 'AUTHENTICATE_UMPIRE_FULFILLED', payload: data.user});
            } else {
                dispatch({type: 'AUTHENTICATE_UMPIRE_REJECTED', payload: data.message})
            }
        } catch (e) {
            dispatch({type: 'AUTHENTICATE_UMPIRE_REJECTED', payload: e.message});
        }

    }
}

export function readUmpire(){
    return async dispatch => {
        dispatch({type: 'READ_UMPIRE'});
        try {
            var {data} = await createInstance().get('/umpires/');
            dispatch({type: 'READ_UMPIRE_FULFILLED', payload: data});
        } catch (e) {
            dispatch({type: 'READ_UMPIRE_REJECTED', payload: e.response && e.response.status !== 401 ? e.message : null});
        }

    }
}
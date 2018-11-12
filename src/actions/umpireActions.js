import { URL, createInstance } from "../config";
import axios from 'axios';


export function authenticateUmpire(username, password){
    return async dispatch => {
        dispatch({type: 'AUTHENTICATE_USER'});
        try {
            var {data, status} = await axios.post(URL + '/auth/login', {username, password});
            if(status === 200){
                sessionStorage.setItem('UMPIRE_TOKEN', data.token);
                dispatch({type: 'AUTHENTICATE_USER_SUCCESS', payload: data.user});
            }
        } catch (e) {
            dispatch({type: 'AUTHENTICATE_USER_REJECTED', payload: e});
        }

    }
}
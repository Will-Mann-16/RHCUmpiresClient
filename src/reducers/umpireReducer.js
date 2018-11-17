const initialState = {
    fetching: false,
    fetched: false,
    authenticated: false,
    error: null,
    user: {}
};

export default function reducer(state = initialState, action){
    switch(action.type){
        case 'AUTHENTICATE_UMPIRE':
            return {...state, fetching: true, fetched: false, authenticated: false};
        case 'AUTHENTICATE_UMPIRE_REJECTED':
            return {...state, fetching: false, authenticated: false, fetched: true, error: action.payload};
        case 'AUTHENTICATE_UMPIRE_FULFILLED':
            return {...state, fetching: false, fetched: true, authenticated: true, user: action.payload};
        case 'READ_UMPIRE':
            return {...state, fetching: true, fetched: false, authenticated: false};
        case 'READ_UMPIRE_REJECTED':
            return {...state, fetching: false, authenticated: false, fetched: true, error: action.payload};
        case 'READ_UMPIRE_FULFILLED':
            return {...state, fetching: false, fetched: true, authenticated: true, user: action.payload};
        default:
            return state;
    }
}
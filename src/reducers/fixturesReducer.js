const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    selectedFixtures: [],
    availableFixtures: [],
    previousFixtures: []
};

export default function reducer(state = initialState, action){
    switch(action.type){
        case 'CREATE_FIXTURE':
            return {...state, fetching: true, fetched: false};
        case 'CREATE_FIXTURE_REJECTED':
            return {...state, fetching: false, fetched: true, error: action.payload};
        case 'CREATE_FIXTURE_FULFILLED':
            return {...state, fetching: false, fetched: true};
        case 'READ_SELECTED_FIXTURES':
            return {...state, fetching: true, fetched: false};
        case 'READ_SELECTED_FIXTURES_REJECTED':
            return {...state, fetching: false, fetched: true, error: action.payload};
        case 'READ_SELECTED_FIXTURES_FULFILLED':
            return {...state, fetching: false, fetched: true, selectedFixtures: action.payload};
        case 'READ_AVAILABLE_FIXTURES':
            return {...state, fetching: true, fetched: false};
        case 'READ_AVAILABLE_FIXTURES_REJECTED':
            return {...state, fetching: false, fetched: true, error: action.payload};
        case 'READ_AVAILABLE_FIXTURES_FULFILLED':
            return {...state, fetching: false, fetched: true, availableFixtures: action.payload};
        default:
            return state;
    }
}
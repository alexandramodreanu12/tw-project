const INITIAL_STATE = {
    locations: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_LOCATIONS_FULFILLED':
            return { ...state, locations: action.payload.data, error: null, fetching: false, fetched: true }
        default:
            return state
    }
}
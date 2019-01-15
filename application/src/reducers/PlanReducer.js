const INITIAL_STATE = {
    plans: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_PLANS_FULFILLED':
            return { ...state, plans: action.payload.data, error: null, fetching: false, fetched: true }
        case 'POST_PLAN_FULFILLED':
        case 'PUT_PLAN_FULFILLED':
        default:
            return state
    }
}
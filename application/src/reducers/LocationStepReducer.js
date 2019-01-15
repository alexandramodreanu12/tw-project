export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'POST_LOCATION_STEP_FULFILLED':
        case 'DELETE_LOCATION_STEP_FULFILLED':
            return action.payload.data;
        default:
            return state
    }
}
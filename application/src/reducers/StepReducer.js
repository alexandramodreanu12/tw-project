export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'POST_STEP_FULFILLED':
        case 'DELETE_STEP_FULFILLED':
            return action.payload.data;
        default:
            return state
    }
}
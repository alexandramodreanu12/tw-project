export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'GET_USER_FULFILLED':
            return action.payload.data;
        case 'POST_USER_FULFILLED':
            return action.payload.data;
        default:
            return state;
    }
}
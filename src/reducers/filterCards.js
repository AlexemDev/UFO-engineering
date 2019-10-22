import { FIND_TAGS, GET_CARDS_DETAILS } from '../actions/SessionActions.js'

const initialState = '';

export default function filterCards(state = initialState, action) {
    switch (action.type) {
        case FIND_TAGS:
            return action.payload
        case GET_CARDS_DETAILS:
            return action.payload
        default:
            return state
    }
}

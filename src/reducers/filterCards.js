import { FIND_TAGS } from '../actions/SessionActions.js'

const initialState = '';

export default function filterCards(state = initialState, action) {
    switch (action.type) {
        case FIND_TAGS:
            return action.payload
        default:
            return state
    }
}

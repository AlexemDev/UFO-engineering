import { FETCH_CARDS, EDIT_TAGS } from '../actions/SessionActions.js'

const initialState =  [];

export default function cards (state = initialState, action) {
    switch (action.type) {
        case FETCH_CARDS:
            return action.payload;
        case EDIT_TAGS:
            return  action.payload;
        default:
            return state
    }
}

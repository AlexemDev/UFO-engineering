import axios from "axios";

export const FETCH_CARDS = 'FETCH_CARDS';
export const FIND_TAGS = 'FIND_TAGS';
export const EDIT_TAGS = 'EDIT_TAGS';
export const GET_CARDS_DETAILS = 'GET_CARDS_DETAILS';

const mockApiData = 'https://pixabay.com/api/?key=13972603-e898c9707a6cf95f52ce67f98&q=cats&image_type=all&per_page=100'

export const getCards = () => dispatch => {
    axios.get(mockApiData)
        .then(response => {
            dispatch({type: FETCH_CARDS, payload: response.data.hits})
        })
        .catch(error => {
            console.log(error);
        });
}

export const findTags = (name) => dispatch => {
    dispatch({type: FIND_TAGS, payload: name})
}

export const editTags = (cards) => dispatch => {
    dispatch({type: EDIT_TAGS, payload: cards})
}

export const getCardsDetails = (id) => dispatch => {
    dispatch({type: GET_CARDS_DETAILS, payload: id})
}

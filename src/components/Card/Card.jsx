import React, { Component } from 'react';
import { connect } from 'react-redux'

import './Card.css'
import {getCardsDetails} from "../../actions/SessionActions";

class Card extends Component {


    componentWillMount() {
        const cardID = new URLSearchParams(this.props.location.search).get("cardid");
        this.props.onGetCardsDetails(cardID);
    }

    render(){
        let cardsDetails = JSON.parse(this.props.allCards);
        cardsDetails.cards = cardsDetails.cards.filter((cards) => {
            return cards.id == +cardsDetails.filterCards;
        });

        return (
            <div className={'card-details'}>
                <div className={'card-details__item card-details__img'}>
                    <img src={ cardsDetails.cards.length && cardsDetails.cards[0].webformatURL} alt=""/>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Height:</span>
                    <span className={'card-details__item_value'}>{cardsDetails.cards.length && cardsDetails.cards[0].webformatHeight}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Width:</span>
                    <span className={'card-details__item_value'}>{cardsDetails.cards.length && cardsDetails.cards[0].webformatWidth}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Downloads:</span>
                    <span className={'card-details__item_value'}>{cardsDetails.cards.length && cardsDetails.cards[0].downloads}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Comments:</span>
                    <span className={'card-details__item_value'}>{cardsDetails.cards.length && cardsDetails.cards[0].comments}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Likes:</span>
                    <span className={'card-details__item_value'}>{cardsDetails.cards.length && cardsDetails.cards[0].likes}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Tags:</span>
                    <span className={'card-details__item_value'}>{cardsDetails.cards.length && cardsDetails.cards[0].tags}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Views:</span>
                    <span className={'card-details__item_value'}>{cardsDetails.cards.length && cardsDetails.cards[0].views}</span>
                </div>


            </div>
        );
    }

};

const mapStateToProps = state => ({
    allCards: JSON.stringify(state)
});

const mapDispatchToProps = dispatch => ({
    onGetCardsDetails: (id) => {
        dispatch(getCardsDetails(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
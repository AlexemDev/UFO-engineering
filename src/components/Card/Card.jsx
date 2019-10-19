import React, { Component } from 'react';
import { connect } from 'react-redux'

import './Card.css'

class Card extends Component {
    state = {
        cardID: 0
    }

    componentDidMount() {
        const cardID = new URLSearchParams(this.props.location.search).get("cardid");
        this.setState({cardID : cardID})

    }

    render(){
        const cards = this.props.allCards.cards;
        return (
            <div className={'card-details'}>
                <div className={'card-details__item card-details__img'}>
                    <img src={cards[this.state.cardID].webformatURL} alt=""/>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Height:</span>
                    <span className={'card-details__item_value'}>{cards[this.state.cardID].webformatHeight}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Width:</span>
                    <span className={'card-details__item_value'}>{cards[this.state.cardID].webformatWidth}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Downloads:</span>
                    <span className={'card-details__item_value'}>{cards[this.state.cardID].downloads}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Comments:</span>
                    <span className={'card-details__item_value'}>{cards[this.state.cardID].comments}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Likes:</span>
                    <span className={'card-details__item_value'}>{cards[this.state.cardID].likes}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Tags:</span>
                    <span className={'card-details__item_value'}>{cards[this.state.cardID].tags}</span>
                </div>

                <div className={'card-details__item'}>
                    <span className={'card-details__item_title'}>Views:</span>
                    <span className={'card-details__item_value'}>{cards[this.state.cardID].views}</span>
                </div>


            </div>
        );
    }

};

const mapStateToProps = state => ({
    allCards: state
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { getCards, findTags, editTags } from '../../actions/SessionActions'

import './Home.css'
import Sort from "./Sort/Sort";
import Filter from "./Filter/Filter";


class Home extends Component {
    state = {
        sortSelect: ''
    }

    componentDidMount() {
        this.props.onGetCards();
    }

    handleTableSort = (e) => {
        this.setState({sortSelect : e.nativeEvent.target.selectedOptions[0].text});
    }

    findTag = (e) => {
        let that = this;
        let target = e.target.value
        setTimeout(() => {
            that.props.onFindTags(target);
        }, 300)
    }

    editTags = (e) => {
        e.target.closest('.card-list__item--tags').classList.add('active');
    }

    addTag = (e) => {
        let tagFieldValue = e.target.closest('.card-list__item_edit').querySelector('input');
        let indexItem = e.target.closest('.card-list__item').id;
        let cardList = this.props.cards;
        cardList[indexItem].tags = cardList[indexItem].tags + ', ' + tagFieldValue.value;
        this.props.onEditTags(cardList);
        tagFieldValue.value = '';
        e.target.closest('.card-list__item--tags').classList.remove('active');
    }




    render(){
        let cardList = JSON.parse(this.props.cards);

        if(this.state.sortSelect === 'Likes'){
            cardList = cardList.sort((a, b) => a.likes - b.likes);
        }
        else if(this.state.sortSelect === 'Comment'){
            cardList = cardList.sort((a, b) => a.comments - b.comments);
        }

        console.log(cardList)

        return(
            <div className={'card-list'}>
                <div className={'card-list__controls'}>
                    <Filter findTag={this.findTag.bind(this)}/>
                    <Sort handleTableSort={this.handleTableSort.bind(this)}/>
                </div>
                <div className={'card-list__head'}>
                    <div className={'card-list__head_row'}>Image</div>
                    <div className={'card-list__head_row'}>Tags</div>
                    <div className={'card-list__head_row'}>Likes</div>
                    <div className={'card-list__head_row'}>Comments</div>
                </div>
                {
                    cardList.length && cardList.map((card, index) =>
                        <div id={index} className={'card-list__item'}>
                            <div className={'card-list__item_row card-list__item--img'}>
                                <Link to={'/card/?cardid=' + index} >
                                    <img src={card.webformatURL} alt="" />
                                </Link>

                            </div>
                            <div className={'card-list__item_row card-list__item--tags'}>
                                <div className={'tags-wrap'} onDoubleClick={this.editTags}>
                                    {
                                        card.tags.split(', ').map((tag) =>
                                            <span>{tag}</span>
                                        )
                                    }
                                </div>
                                <div className={'card-list__item_edit'}>
                                    <input id={index} type="text" placeholder={'Add tags'}/>
                                    <button onClick={this.addTag}>Add Tag</button>
                                </div>

                            </div>
                            <div className={'card-list__item_row card-list__item--likes'}>
                                <span>{card.likes}</span>
                            </div>
                            <div className={'card-list__item_row card-list__item--comments'}>
                                <span>{card.comments}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cards: JSON.stringify(state.cards.filter(cards => cards.tags.includes(state.filterCards))),
});

const mapDispatchToProps = dispatch => ({
    onGetCards: () => {
        dispatch(getCards())
    },
    onFindTags: (name) => {
        dispatch(findTags(name))
    },
    onEditTags: (cards) => {
        dispatch(editTags(cards))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
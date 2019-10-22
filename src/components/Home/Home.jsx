import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { getCards, findTags, editTags } from '../../actions/SessionActions'

import './Home.css'
import Sort from "./Sort/Sort";
import Filter from "./Filter/Filter";


class Home extends Component {
    constructor(props) {
        super();

        this.state = {
            sortSelect: ''
        }

        this.tagsContainer = [];
        this.tagsWrap = [];
        this.inputAddTags = [];
        this.editButtonTags = [];
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

    editTags = (index) => {
        this.tagsWrap[index].classList.add('active');
    }

    addTag = (index) => {
        let indexItem = this.tagsContainer[index].id;
        let cardList = JSON.parse(this.props.cards);
        cardList[indexItem].tags = cardList[indexItem].tags + ', ' + this.inputAddTags[index].value;
        this.props.onEditTags(cardList);
        this.inputAddTags[index].value = '';
        this.tagsWrap[index].classList.remove('active');
    }




    render(){
        let cardList = JSON.parse(this.props.cards);
        let filterArray = cardList.filterCards.split(', ');

        var filtered = cardList.cards.filter(cards => {
            var itemTags = cards.tags.split(", ");
            for (var i = 0; i < filterArray.length; i++) {
                var temp = itemTags.filter(item => item.includes(filterArray[i]));
                if (temp == '')
                    return false;
            }
            return true;
        })

        if(cardList.filterCards !== ''){
            cardList.cards = filtered
        }

        if(this.state.sortSelect === 'Likes'){
            cardList.cards = cardList.cards.sort((a, b) => a.likes - b.likes);
        }
        else if(this.state.sortSelect === 'Comment'){
            cardList.cards = cardList.cards.sort((a, b) => a.comments - b.comments);
        }

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
                    cardList.cards.length && cardList.cards.map((card, index) =>
                        <div id={index} className={'card-list__item'} ref={ ref => (this.tagsContainer[index] = ref)}>
                            <div className={'card-list__item_row card-list__item--img'}>
                                <Link to={'/card/?cardid=' + card.id} >
                                    <img src={card.webformatURL} alt="" />
                                </Link>

                            </div>
                            <div className={'card-list__item_row card-list__item--tags'} ref={ ref => (this.tagsWrap[index] = ref)}>
                                <div className={'tags-wrap'} onDoubleClick={() => this.editTags(index)}>
                                    {
                                        card.tags.split(', ').map((tag) =>
                                            <span>{tag}</span>
                                        )
                                    }
                                </div>
                                <div className={'card-list__item_edit'}>
                                    <input id={index} type="text" placeholder={'Add tags'} ref={ ref => (this.inputAddTags[index] = ref)}/>
                                    <button onClick={() => (this.addTag(index))} ref={ ref => (this.editButtonTags[index] = ref)}>Add Tag</button>
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
    cards: JSON.stringify(state),
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
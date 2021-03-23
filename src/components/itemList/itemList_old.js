import React, {Component} from 'react';
import Spinner from '../spinner/spinner';
import styled from 'styled-components';

const ListGroupItemLi = styled.li`
    cursor: pointer;
`;

export default class ItemList extends Component {
    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
        .then((itemList) => {
            this.setState({
                itemList
            });
        })
    }

    renderItems(arr) {
        return arr.map(item => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <ListGroupItemLi
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </ListGroupItemLi>
            )
        })
    }

    render() {

        const {itemList} = this.state;
        
        const items = () => {
            return itemList ? this.renderItems(itemList) : 'Error';
        }

        return (
            <ul className="item-list list-group">
                {!itemList && <Spinner/>}
                {itemList && items()}
            </ul>
        );
    }
}
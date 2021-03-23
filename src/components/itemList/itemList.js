import React, {useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';
import styled from 'styled-components';

const ListGroupItemLi = styled.li`
    cursor: pointer;
`;

const ItemList = (props) => {
    const {getData, onItemSelected, renderItem} = props;

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        getData()
        .then((data) => {
            setItemList(data)
        })
    }, [props, getData])

    const renderItems = (arr) => {
        return arr.map(item => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <ListGroupItemLi
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </ListGroupItemLi>
            )
        })
    }
        
    const items = () => {
        return itemList ? renderItems(itemList) : 'Error';
    }

    return (
        <ul className="item-list list-group">
            {!itemList && <Spinner/>}
            {itemList && items()}
        </ul>
    );
}

ItemList.defaultProps = {
    onItemSelected: () => {}
}

export default ItemList;
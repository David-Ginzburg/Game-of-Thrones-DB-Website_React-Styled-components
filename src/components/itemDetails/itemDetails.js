import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';

const FieldDescrSPAN = styled.span`
    text-align: right;
`;

const Field = ({item, field, label}) => {
    return (
    <>
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <FieldDescrSPAN>{item[field]}</FieldDescrSPAN>
        </li>
    </>)
}

export {Field};

const ItemDetailsDIV = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
`;

const ItemDetailsTitleH4 = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const SelectErrorDIV = styled.ul`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

const ItemDetails = (props) => {
    const [item, setItem] = useState(null)

    const updateItem = useCallback(() => {
        const {itemId, getData} = props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((data) => {
                setItem(data)
            })
    }, [props])

    useEffect(() => {
        updateItem();
    }, [props, updateItem])

    if (!item) {
        return <SelectErrorDIV>{props.selectTitle}</SelectErrorDIV>
    }

    const {name} = item;

    return (
        <ItemDetailsDIV className="rounded">
            <ItemDetailsTitleH4>{name}</ItemDetailsTitleH4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </ItemDetailsDIV>
    );
    
}

export default ItemDetails;
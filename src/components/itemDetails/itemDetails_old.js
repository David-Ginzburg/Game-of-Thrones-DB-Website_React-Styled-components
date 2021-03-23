import React, {Component} from 'react';
import gotService from '../services/gotService';
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

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }
    }

    updateItem = () => {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
    }

    render() {

        if (!this.state.item) {
            return <SelectErrorDIV>{this.props.selectTitle}</SelectErrorDIV>
        }

        const {item} = this.state;
        const {name} = item;

        return (
            <ItemDetailsDIV className="rounded">
                <ItemDetailsTitleH4>{name}</ItemDetailsTitleH4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </ItemDetailsDIV>
        );
    }
}
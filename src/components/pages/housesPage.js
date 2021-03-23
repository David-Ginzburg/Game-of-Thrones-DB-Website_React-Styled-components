import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList/itemList';
import ItemDetails, { Field } from '../itemDetails/itemDetails';
import ErrorMessage  from '../errorMeessage/errorMessage';
import gotService from '../services/gotService';

export default class HousesPage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getHouses}
                renderItem={({name}) => name}
            />
        )

        const houseDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}
                selectTitle={'Please select a house'}
            >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )

        return (
            <RowBlock
                left={itemList}
                right={houseDetails}
            />
        )
    }
}
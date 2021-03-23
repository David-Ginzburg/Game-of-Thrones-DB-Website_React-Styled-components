import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList/itemList';
import ItemDetails, { Field } from '../itemDetails/itemDetails';
import ErrorMessage  from '../errorMeessage/errorMessage';
import gotService from '../services/gotService';

export default class CharactersPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
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
                getData={this.gotService.getCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        const charDetails = (
            <ItemDetails 
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}
                selectTitle={'Please select a character'}
            >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )

        return (
            <RowBlock
                left={itemList}
                right={charDetails}
            />
        )
    }
}
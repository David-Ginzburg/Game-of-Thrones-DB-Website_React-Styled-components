import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import ItemList from '../itemList/itemList';
import ErrorMessage  from '../errorMeessage/errorMessage';
import gotService from '../services/gotService';

class BooksPage extends Component {

    gotService = new gotService();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getBooks}
                renderItem={({name}) => name}
            />
        )
    }
}

export default withRouter(BooksPage);
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Col, Row, Container, Button} from 'reactstrap';
import styled from 'styled-components';

import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharacterPage from '../pages/charactersPage';
import HousePage from '../pages/housesPage';
import BooksPage from '../pages/booksPage';
import BooksItem from '../pages/booksItem';
import ErrorMessage  from '../errorMeessage/errorMessage';

import gotService from '../services/gotService';

const WelcomeTitleH1 = styled.h1`
    color: #ffffff;
`;

const AppDIV = styled.div`
    background: url('../img/got.jpeg') center / cover no-repeat;
    min-height: 100vh;
`;

class App extends Component {

    gotService = new gotService();

    state = {
        showRandom: true,
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    onRandomToggle = () => {
        this.setState({showRandom: !this.state.showRandom});
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const {showRandom} = this.state;
        return (
            <Router>
                <AppDIV>
                    <Container>
                        <Header />
                    </Container>
                    <Container className="pb-5">
                        {showRandom && <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <RandomChar/>
                            </Col>
                        </Row>}
                        <Button
                            color="primary"
                            className="mb-5"
                            onClick={this.onRandomToggle}
                        >
                            Toggle random character
                        </Button>
                        <Route path='/' exact component={() => <WelcomeTitleH1>Welcome to GOT DB</WelcomeTitleH1>} />
                        <Route path='/characters/' exact component={CharacterPage}/>
                        <Route path='/houses/' exact component={HousePage}/>
                        <Route path='/books/' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </AppDIV>
            </Router>    
        );
    }
};

export default App;
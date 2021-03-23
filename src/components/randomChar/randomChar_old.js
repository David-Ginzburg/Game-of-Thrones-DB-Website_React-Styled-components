import React, {Component} from 'react';
import gotService from '../services/gotService';
import ErrorMessage from '../errorMeessage/errorMessage';
import Spinner from '../spinner/spinner';
import styled from 'styled-components';

const RandomBlockDIV = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const RandomBlockTitleH4 = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const RandomBlockTitleSPAN = styled.span`
    font-weight: bold;
`;

const RandomBlockDescrSPAN = styled.span`
    text-align: right;
`;

export default class RandomChar extends Component {
    gotService = new gotService();
    
    state = {
        char: {},
        loaded: false,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 15000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState(
            {char,
            loaded: true}
        );
    }

    onError = () => {
        this.setState(
            {error: true,
            loaded: true}
        );
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char: { name, gender, born, died, culture }, loaded, error } = this.state;

        return (
            <RandomBlockDIV className="random-block rounded">
                {!loaded && <Spinner/>}
                {loaded && error && <ErrorMessage/>}
                {loaded && !error &&
                <>
                    <RandomBlockTitleH4>Random Character: {name}</RandomBlockTitleH4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between">
                            <RandomBlockTitleSPAN>Gender </RandomBlockTitleSPAN>
                            <RandomBlockDescrSPAN>{gender}</RandomBlockDescrSPAN>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <RandomBlockTitleSPAN>Born </RandomBlockTitleSPAN>
                            <RandomBlockDescrSPAN>{born}</RandomBlockDescrSPAN>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <RandomBlockTitleSPAN>Died </RandomBlockTitleSPAN>
                            <RandomBlockDescrSPAN>{died}</RandomBlockDescrSPAN>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <RandomBlockTitleSPAN>Culture </RandomBlockTitleSPAN>
                            <RandomBlockDescrSPAN>{culture}</RandomBlockDescrSPAN>
                        </li>
                    </ul>
                </>}
            </RandomBlockDIV>
        );
    }
}
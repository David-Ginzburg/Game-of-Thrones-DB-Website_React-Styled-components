import React, {useState, useEffect, useCallback} from 'react';
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

const RandomChar = () => {
    const getService = new gotService();
    
    const [char, setChar] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const onCharLoaded = useCallback((char) => {
        setChar(char);
        setLoaded(true);
    }, [setChar, setLoaded])

    const onError = useCallback(() => {
        setError(true)
        setLoaded(true)
    }, [setError, setLoaded])

    const updateChar = useCallback(() => {
        const id = Math.floor(Math.random()*140 + 25);
        getService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    },[getService, onCharLoaded, onError])

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 15000);
        return () => {clearInterval(timerId)}
    }, [])

    const { name, gender, born, died, culture } = char;

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

export default RandomChar;
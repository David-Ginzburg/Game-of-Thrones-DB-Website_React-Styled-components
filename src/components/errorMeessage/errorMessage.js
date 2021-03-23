import React from 'react';
import styled from 'styled-components';

const ErrorPicIMG = styled.img`
    width: 100%;
`;

const ErrorMessage = () => {
    return (
        <>
            <ErrorPicIMG src={process.env.PUBLIC_URL + '/img/error.jpeg'} alt='error'></ErrorPicIMG>
            <span>Something goes wrong :(</span>
        </>
    )
    
}

export default ErrorMessage;
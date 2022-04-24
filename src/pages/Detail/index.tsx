import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const parmas = useParams();

    return (
        <div>User Detail - {parmas.id}</div>
    )
}

export default Detail;
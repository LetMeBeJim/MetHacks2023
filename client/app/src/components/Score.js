import React from 'react';

const Score = (props) => {
    const score = props.score;
    const id = props.id;
    const addPoint = () => {
        fetch('http://localhost:27017/add/'+id);
    }
    const takePoint = () => {
        fetch('http://localhost:27017/take/'+id);
    }


    return (
        <>
            <div>
                <button onClick={addPoint}>+</button>
            </div>
            <div>
                {score}
            </div>
            <div>
                <button onClick={takePoint}>-</button>
            </div>
        </>
    )
}

export default Score;
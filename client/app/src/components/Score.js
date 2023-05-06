import React, { useState }from 'react';

const Score = (props) => {
    const [score, setScore] = useState(props.score)
    const id = props.id;
    const addPoint = () => {
        console.log("hi")
        console.log(id)
        fetch('http://localhost:27017/add/'+id);
    }
    const takePoint = () => {
        fetch('http://localhost:27017/take/'+id);
    }

    const increment = () => {
        setScore(score + 1);
      };
    
    const decrement = () => {
        setScore(score-1)
    }

    return (
        <>
            <div>
                <button onClick={() => {addPoint(); increment();}}>+</button>
            </div>
            <div>
                {score}
            </div>
            <div>
                <button onClick={() => {takePoint(); decrement();}}>-</button>
            </div>
        </>
    )
}

export default Score;
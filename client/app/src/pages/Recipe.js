import React, { useState, useEffect } from 'react';
import './Recipe.css';
import Score from '../components/Score';

const Recipe = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            
            const response = await fetch('http://localhost:27017/random');
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);


    return (
        <>
            <div>
                {data ? (
                    <div className="random">
                        <h1>Random Entries!</h1>
                        <div className="row">
                            <div className="col">
                                <Score id={data[0].id} score={data[0].score}/>
                                <p>{data[0].result}</p>
                            </div>
                            <div className="col">
                                <Score id={data[0].id} score={data[0].score}/>
                                <p>{data[1].result}</p>
                            </div>
                            <div className="col">
                                <Score id={data[0].id} score={data[0].score}/>
                                <p>{data[2].result}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </>
    )
}

export default Recipe;  
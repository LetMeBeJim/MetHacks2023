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
                            <a className="col" style={{ textDecoration: 'none', color: 'black' }} href={"/recipe/"+data[0]._id}>
                                <div>
                                    <Score id={data[0]._id} score={data[0].score}/>
                                    <p>{data[0].result}</p>
                                </div>
                            </a>
                            <a className="col" style={{ textDecoration: 'none', color: 'black'  }} href={"/recipe/"+data[1]._id}>
                                <div>
                                    <Score id={data[1]._id} score={data[1].score}/>
                                    <p>{data[1].result}</p>
                                </div>
                            </a>
                            <a className="col" style={{ textDecoration: 'none', color: 'black'  }} href={"/recipe/"+data[2]._id}>
                                <div>
                                    <Score id={data[2]._id} score={data[2].score}/>
                                    <p>{data[2].result}</p>
                                </div>
                            </a>
                            
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
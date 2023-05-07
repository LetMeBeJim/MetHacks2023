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
                    <div className="random font-urbanist">
                        <h1 className="h-[5vh]">Recipe Entries!</h1>
                        <div className="row mx-4 my-2 h-[80vh] overflow-hidden">
                            <div className="transition duration-300 ease-in-out hover:scale-[1.01] h-full col bg-[#d2ff70] mx-2 overflow-hidden border-black rounded-3xl">
                                <Score id={data[0]._id} score={data[0].score}/>
                                <a className="h-full" style={{ textDecoration: 'none', color: 'black' }} href={"/recipe/"+data[0]._id}>
                                    <p className="h-full" >{data[0].result}</p>
                                </a>
                            </div>
                            
                            <div className="transition duration-300 ease-in-out hover:scale-[1.01] h-full col bg-[#d2ff70] mx-2 overflow-hidden border-black rounded-3xl">
                                <Score id={data[1]._id} score={data[1].score}/>
                                <a className="h-full" style={{ textDecoration: 'none', color: 'black'  }} href={"/recipe/"+data[1]._id}>
                                    <p className="h-full">{data[1].result}</p>
                                </a>
                            </div>
                            
                            <div className="transition duration-300 ease-in-out hover:scale-[1.01] h-full col bg-[#d2ff70] mx-2 overflow-hidden border-black rounded-3xl">
                                <Score id={data[2]._id} score={data[2].score}/>
                                <a className="h-full" style={{ textDecoration: 'none', color: 'black'  }} href={"/recipe/"+data[2]._id}>
                                    <p className="h-full">{data[2].result}</p>
                                </a>
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
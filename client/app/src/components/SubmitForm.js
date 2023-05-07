import React, { useState } from 'react';
import { Link  } from "react-router-dom";
import Loading from './Loading';

const SubmitForm = () => {
const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    ingredients: '',
    ethnicity: '',
    time: '',
    difficulty: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState("");

  const reset = () => {
    setData("");
    }

const sendDb = async () => { 
    console.log("send to db");
    console.log(localStorage.getItem('result'));
    const result = localStorage.getItem('result');
    console.log(typeof(result))
    
    const response = await fetch('http://localhost:27017/db2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: result,
    });
}
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    setSubmitting(true);
    console.log(formData)
    const response = await fetch('http://localhost:27017/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    console.log(data)
    console.log(JSON.parse(data).result)
    setData(JSON.parse(data).result);

    setSubmitting(false);
    localStorage.setItem('prompt', formData);
    localStorage.setItem('result', JSON.parse(data).result);
    setIsLoading(false)
  };

    return (
        <>
            {isLoading ? (
                <Loading></Loading>
            ):(
                    <div>
                    {data ? (
                        <div className=" w-[100vw] bg-[#d2ff70] py-10 h-[60vh] rounded-full font-urbanist self-center">
                            <div className="my-10000">
                                {data}
                            </div>
                            <div>
                                <button color="primary" className="px-4 h-[10%] py-1 pr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded-full text-center"
                                    onClick={sendDb}>
                                        Like!
                                    </button>
                                <button classname="px-4 h-[10%] py-1 pr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded-full text-center"
                                    onClick={reset}>
                                        Generate Another!
                                    </button>
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="row">
                                <div className="col"/>
                                <div className="col">
                                    <div className="text-6xl font-bold font-urbanist">
                                        Make A Recipe!
                                    </div>
                                    <div className="h-[15vh] py-2 font-urbanist">
                                        <p>
                                        1. List all the ingredients you have in your fridge! <br></br>
                                        2. Choose the dish ethinicity <br></br>
                                        3. How quick would you like it? Slow? Fast? <br></br>
                                        4. How difficult should this dish be? Easy, Medium, or Hard?
                                        </p>
                                        
                                    </div>
                                    <div className="row w-[60vw] bg-[#d2ff70] py-10 h-[30vh] rounded-full font-urbanist">
                                        <form onSubmit={handleSubmit} className="h-full ">
                                            <div className="row h-[20%] py-1 pr-20">
                                            <label className="col" htmlFor="ingredients">Ingredients:</label>
                                            <input className="col"
                                                id="ingredients"
                                                name="ingredients"
                                                value={formData.ingredients}
                                                onChange={handleChange}
                                                required
                                            />
                                            </div>
                                            <div className="row h-[20%] py-1 pr-20">
                                            <label className="col" htmlFor="ethnicity">Ethnicity:</label>
                                            <input className="col"
                                                id="ethnicity"
                                                name="ethnicity"
                                                value={formData.ethnicity}
                                                onChange={handleChange}
                                                required
                                            />
                                            </div>
                                            <div className="row h-[20%] py-1 pr-20">
                                            <label className="col" htmlFor="time">Time:</label>
                                            <input className="col"
                                                id="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                required
                                            />
                                            </div>
                                            <div className="row h-[20%] py-1 pr-20">
                                            <label className="col" htmlFor="difficulty">Difficulty:</label>
                                            <input className="col"
                                                id="difficulty"
                                                name="difficulty"
                                                value={formData.difficulty}
                                                onChange={handleChange}
                                                required
                                            />
                                            </div>
                                            <div>
                                            <button className="h-[10%] py-1 pr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded-full text-center"
                                            type="submit" 
                                            disabled={submitting}>
                                            {submitting ? 'Submitting...' : 'Submit'}
                                            </button>
                                            </div>
                                            
                                        </form>
                                        </div>
                                </div>
                                <div className="col"/>
                            
                            </div>
                        </div>
                    )
                }
                </div>
            )}
        </>

      );
  
  
};

export default SubmitForm;
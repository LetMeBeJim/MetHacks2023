import React, { useState } from 'react';
import { Link  } from "react-router-dom";

const SubmitForm = () => {
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
  };

    return (
        <div>
            {data ? (
                <div>
                    <div>
                        {data}
                    </div>
                    <div>
                        <button color="primary" className="px-4"
                            onClick={sendDb}>
                                {/* on click animation here */}
                                Like!
                            </button>
                        <button color="primary" 
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
                            <div className="text-6xl font-bold ">
                                Make A Recipe!
                            </div>
                            <div className="h-[15vh]"></div>
                            <div className="w-[60vw] bg-[#d2ff70] py-10 h-[30vh]">
                                <form onSubmit={handleSubmit} className="h-full">
                                    <div className="row h-[20%] py-2 pr-8">
                                    <label className="col" htmlFor="ingredients">Ingredients:</label>
                                    <input className="col"
                                        id="ingredients"
                                        name="ingredients"
                                        value={formData.ingredients}
                                        onChange={handleChange}
                                        required
                                    />
                                    </div>
                                    <div className="row h-[20%] py-2 pr-8">
                                    <label className="col" htmlFor="ethnicity">Ethnicity:</label>
                                    <input className="col"
                                        id="ethnicity"
                                        name="ethnicity"
                                        value={formData.ethnicity}
                                        onChange={handleChange}
                                        required
                                    />
                                    </div>
                                    <div className="row h-[20%] py-2 pr-8">
                                    <label className="col" htmlFor="time">Time:</label>
                                    <input className="col"
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                    </div>
                                    <div className="row h-[20%] py-2 pr-8">
                                    <label className="col" htmlFor="difficulty">Difficulty:</label>
                                    <input className="col"
                                        id="difficulty"
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        required
                                    />
                                    </div>
                            
                                    <button  className="h-[20%] py-2 pr-8" type="submit" disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </form>
                                </div>
                        </div>
                        <div className="col"/>
                    
                    </div>
                </div>
            )
        }
          
          
        </div>
      );
  
  
};

export default SubmitForm;
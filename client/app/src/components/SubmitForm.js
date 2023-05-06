import React, { useState } from 'react';
import Select from 'react-select'
import ethnicityChoices from './Ethnicity.json';
import ingredientsChoices from './Ingredients.json';

const SubmitForm = () => {
  const [formData, setFormData] = useState({
    ingredients: '',
    ethnicity: '',
    time: '',
    difficulty: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    fetch('http://localhost:27017/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {setData(data)});
    
    setHasData(true);
    alert('Data submitted successfully');

    console.log(formData)
    setSubmitting(false);
    console.log(data)
  };

  if (hasData) {
    return (
        <>
            {data.result}
        </>
    )
  } else {
    return (
        <div>
          <h1>Submit Data</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="ingredients">Ingredients:</label>
              <input
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="ethnicity">Ethnicity:</label>
              <input
                id="ethnicity"
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="time">Time:</label>
              <input
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="difficulty">Difficulty:</label>
              <input
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              />
            </div>
    
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>

          </form>
        </div>
      );
  }
  
};

export default SubmitForm;
import React, { useState, useEffect } from 'react';
const Comment = (props) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:27017/comments');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    useEffect(() => {
      fetchComments();
    }, []);

    const itemId = props.id
    console.log(itemId);
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleTextChange = (e) => {
      setText(e.target.value);
    };

    const handleSubmit = async () => {
        const data = {
          name,
          text,
          itemId
        };
        console.log(data)
        try {
            const response = await fetch('http://localhost:27017/comments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            // Handle the response as needed
            if (response.ok) {
              console.log('Data submitted successfully');
            } else {
              console.log('Error submitting data');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };

    return (
        <>
            <div className="row">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="text">Text:</label>
                    <textarea
                    id="text"
                    rows="4"
                    cols="50"
                    value={text}
                    onChange={handleTextChange}
                    />
                </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <div className="row">
              <h2>Comments:</h2>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    User: {comment.name} said : {comment.text}
                  </li>
                ))}
              </ul>
            </div>
        </>
    )
}

export default Comment;
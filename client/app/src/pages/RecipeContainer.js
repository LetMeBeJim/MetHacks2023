import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"

const RecipeContainer = () => {
  const { id } = useParams()

  const [data, setData] = useState('');
  useEffect(() => {
      async function fetchData() {
          const response = await fetch('http://localhost:27017/'+id)
          const result = await response.json();
          setData(result);
          console.log(data)
      };
      fetchData();
  }, []);


  return (
    <>
        <div>
            hello
        </div>
        {data ? (
            <div>
                <div>
                    {data.tags.body.summary}
                </div>
                <div>
                    {data.result}
                </div>
                <div>
                    {data.score}
                </div>
            </div>
                
        ) : (
            <p>loading</p>
        )}
        
    </>
  )
}

export default RecipeContainer;
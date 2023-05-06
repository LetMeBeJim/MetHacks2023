import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import Score from '../components/Score';
import Comment from '../components/Comment';

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
                <div className="row">
                    <div className="col-2">
                        <Score id={data._id} score={data.score}/>
                    </div>
                    <div className="col-10">
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
                </div>
                <div className="row">
                    <Comment id={data._id}/>
                </div>
            </div>
            
                
        ) : (
            <p>loading</p>
        )}
        
    </>
  )
}

export default RecipeContainer;
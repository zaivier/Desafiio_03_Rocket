import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
    api.get('/repositories').then(response => {
     setRepositories(response.data);
   });
 },[]);
 
  async function handleAddRepository() {
    
    const response = await api.post('repositories',  { 
      id: 111111,     
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    if(response.status == 200){
      setRepositories([...repositories, response.data]);
    }    
  }

  async function handleRemoveRepository(id) 
  {
    const response = await api.delete(`repositories/${id}`).then(()=>{
      api.get('/repositories').then(response => {
        
        setRepositories(response.data);
        console.log(response.data);       
     });
    });    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repository) => {return( 
            <li key={repository.id}>
              {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
          </button>
            </li>)
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );

  
}

export default App;

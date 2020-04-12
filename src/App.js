import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => {
        //console.log(response.data);
        setRepositories(response.data);
      });

  }, []);

  async function handleAddRepository(repository) {
    api.post('/repositories', {
        title: `Title of Course ${Date.now()}`,
        url: `www.site.com.br`,
        techs: ['nodejs','typescript']
      })
      .then(response => {
        setRepositories([...repositories, response.data]);
      });
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`/repositories/${id}`);

      if(response.status === 204)
      {
        setRepositories(repositories.filter(repo => repo.id !== id));
      }

    } catch (err) {
        alert('Erro ao deletar caso, tente novamente.');
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}> 
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

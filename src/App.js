import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Desafio novo ${Date.now()}`,
      url: 'http://github.com/mateuscaldas',
      techs: ["Node.js", "JavaScript"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const tempRepositories = [...repositories];
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    tempRepositories.splice(repositoryIndex, 1);

    await api.delete(`/repositories/${id}`);
    
    setRepositories(tempRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

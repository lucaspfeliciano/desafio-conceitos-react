import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const body = {
      title: "Aplicativo Meu Curso",
      url: "github.com/lucaspfeliciano/meu-curso",
      techs: ["Node", "React Native"]
    }
    const response = await api.post('/repositories', body)
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`);

    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    const newRepositories = [...repositories]

    newRepositories.splice(repositorieIndex, 1);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

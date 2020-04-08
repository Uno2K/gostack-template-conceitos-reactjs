import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
    const [repositories, setRepositories] = useState([])

  async function handleAddRepository({title='No name project',url='https//exampleurl.com',techs=['NodeJS','ReactJS','React Native']}) {
    // TODO -> 
    const response = await api.post("/repositories", {
      title,
      url,
      techs
    }); 
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    // TODO ->
    await api.delete(`/repositories/${id}`)
    const repositoryIndex = repositories.findIndex(repo => repo.id === id)
    repositories.splice(repositoryIndex, 1)
    const alteredRepositories = [...repositories];
    setRepositories(alteredRepositories);
  } 

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul> 

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React,{useState,useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  //Adicionar repositório
  async function handleAddRepository() {    
    const response = await api.post('repositories', {
      title: 'Desafio ReactJS',
      url: 'https://www.google.com.br/',
      techs: ['ReactJS', 'NodeJS']
    });

    setRepositories([...repositories,response.data]);
  }

  //Remover Repositório
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return(
    <> 
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => <li key={repository.id}>{repository.title}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>

          </li>)}
        </ul>
        <button type="button" onClick={handleAddRepository}>Adicionar</button>
      </div>   
    </>       
  );              
}

export default App;
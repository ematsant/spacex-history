import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Nossos estados: um para os dados, outro para o controle de loading
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.spacexdata.com/v3/launches');
        setLaunches(result.data); // Guarda os dados no estado
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false); // Remove a mensagem de "Carregando"
      }
    };

    fetchData();
  }, []); // Array vazio para que o efeito rode apenas uma vez

  return (
    <div className="App">
      <h1>Histórico de Lançamentos da SpaceX</h1>

      {/* Renderização Condicional: 
        Se 'loading' for verdadeiro, mostra o parágrafo.
        Senão, mostra a lista.
      */}
      {loading ? (
        <p>Carregando lançamentos...</p>
      ) : (
        <ul>
          {/* Mapeia cada lançamento para um item de lista (li) */}
          {launches.map(launch => (
            <li key={launch.flight_number}>
              {launch.mission_name} - ({launch.launch_year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
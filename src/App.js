import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LaunchList } from './pages/LaunchList';
// Futuramente importarei a página de detalhes aqui

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchList />} />
        {/* Futuramente adicionarei a rota de detalhes aqui */}
      </Routes>
    </Router>
  );
}

export default App;